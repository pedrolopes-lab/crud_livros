import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivroService } from '../../core/services/livro.service';
import { AuthService } from '../../core/services/auth.service';
import { Livro, CreateLivro } from '../../core/models/livro.model';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  // signals — lista de livros e filtro de pesquisa
  livros = signal<Livro[]>([]);
  filtro = signal<string>('');

  // livros filtrados — calculado automaticamente quando livros ou filtro mudam
  livrosFiltrados = computed(() => {
    const termo = this.filtro().toLowerCase();
    return this.livros().filter(l =>
      l.nome.toLowerCase().includes(termo) ||
      l.autor.toLowerCase().includes(termo) ||
      (l.categoria?.toLowerCase().includes(termo) ?? false)
    );
  });

  // controle do formulário de cadastro/edição
  mostrarFormulario = signal<boolean>(false);
  livroEditando = signal<Livro | null>(null);
  livroForm: FormGroup;

  // categorias disponíveis no dropdown
  categorias = ['Ficção', 'Romance', 'Autoconhecimento', 'Tecnologia', 'Biografia'];

  constructor(
    private livroService: LivroService,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    this.livroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      autor: ['', [Validators.required, Validators.maxLength(50)]],
      categoria: [''],
      totalPaginas: [1, [Validators.required, Validators.min(1)]],
      ativo: [true]
    });
  }

  ngOnInit(): void {
    this.carregarLivros();
  }

  // busca todos os livros da API
  carregarLivros(): void {
    this.livroService.getAll().subscribe({
      next: (livros) => this.livros.set(livros),
      error: (err) => console.error('Erro ao carregar livros', err)
    });
  }

  // abre o formulário para cadastrar novo livro
  novoLivro(): void {
    this.livroEditando.set(null);
    this.livroForm.reset({ ativo: true, totalPaginas: 1 });
    this.mostrarFormulario.set(true);
  }

  // abre o formulário para editar livro existente
  editarLivro(livro: Livro): void {
    this.livroEditando.set(livro);
    this.livroForm.patchValue(livro);
    this.mostrarFormulario.set(true);
  }

  // remove um livro — backend impede remoção de livro ativo
  removerLivro(id: number): void {
    this.livroService.delete(id).subscribe({
      next: () => this.carregarLivros(),
      error: (err) => alert('Não é possível remover um livro ativo!')
    });
  }

  // salva o livro — cria ou atualiza dependendo se está editando
  salvar(): void {
    if (this.livroForm.invalid) return;

    const dados: CreateLivro = this.livroForm.value;
    const editando = this.livroEditando();

    if (editando) {
      this.livroService.update(editando.id, dados).subscribe({
        next: () => {
          this.carregarLivros();
          this.mostrarFormulario.set(false);
        }
      });
    } else {
      this.livroService.create(dados).subscribe({
        next: () => {
          this.carregarLivros();
          this.mostrarFormulario.set(false);
        }
      });
    }
  }

  // cancela o formulário
  cancelar(): void {
    this.mostrarFormulario.set(false);
  }
}