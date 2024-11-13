#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Aluno {
    int id; // ID do aluno gerado automaticamente
    char nome[50];
    int cartao_id; // ID do cartão, igual ao ID do aluno
    char plano[20];
    int pagamento_em_dia;
    int ativo;
    struct Aluno *esquerda;
    struct Aluno *direita;
} Aluno;

Aluno* raiz = NULL;
int total_alunos = 0; // Contador para gerar IDs automáticos

// Função para criar um novo nó de aluno
Aluno* criar_aluno(char nome[], char plano[], int pagamento_em_dia) {
    Aluno* novo_aluno = (Aluno*)malloc(sizeof(Aluno));
    novo_aluno->id = ++total_alunos;  // ID do aluno gerado automaticamente
    novo_aluno->cartao_id = total_alunos;  // ID do cartão igual ao ID do aluno
    strcpy(novo_aluno->nome, nome);
    strcpy(novo_aluno->plano, plano);
    novo_aluno->pagamento_em_dia = pagamento_em_dia;
    novo_aluno->ativo = 1;
    novo_aluno->esquerda = novo_aluno->direita = NULL;
    return novo_aluno;
}

// Função para inserir um aluno na árvore
Aluno* inserir_aluno(Aluno* raiz, Aluno* novo_aluno) {
    if (raiz == NULL) return novo_aluno;
    if (novo_aluno->cartao_id < raiz->cartao_id) {
        raiz->esquerda = inserir_aluno(raiz->esquerda, novo_aluno);
    } else {
        raiz->direita = inserir_aluno(raiz->direita, novo_aluno);
    }
    return raiz;
}

// Função para buscar um aluno pelo ID do cartão
Aluno* buscar_aluno(Aluno* raiz, int cartao_id) {
    if (raiz == NULL || raiz->cartao_id == cartao_id)
        return raiz;
    if (cartao_id < raiz->cartao_id)
        return buscar_aluno(raiz->esquerda, cartao_id);
    else
        return buscar_aluno(raiz->direita, cartao_id);
}

// Função para exibir todos os alunos cadastrados
void listar_alunos(Aluno* raiz) {
    if (raiz != NULL) {
        listar_alunos(raiz->esquerda);
        if (raiz->ativo) { // Verifica se o aluno está ativo antes de listar
            printf("Nome: %s, ID do Cartao: %d, Plano: %s, Pagamento: %s\n",
                   raiz->nome,
                   raiz->cartao_id,
                   raiz->plano,
                   raiz->pagamento_em_dia ? "Em dia" : "Pendente");
        }
        listar_alunos(raiz->direita);
    }
}

// Função para alterar o plano de um aluno
void alterar_plano() {
    int cartao_id;
    printf("\n=== Alunos Cadastrados ===\n");
    listar_alunos(raiz);
    printf("Escolha o ID do cartao para alterar plano: ");
    scanf("%d", &cartao_id);

    Aluno* aluno = buscar_aluno(raiz, cartao_id);
    if (aluno != NULL) {
        printf("Novo plano (mensal/trimestral/anual): ");
        scanf("%s", aluno->plano);
        printf("Plano atualizado com sucesso!\n");
    } else {
        printf("Aluno nao encontrado!\n");
    }
}

// Função para alterar o status de pagamento do aluno
void alterar_status_pagamento() {
    int cartao_id;
    printf("\n=== Alunos Cadastrados ===\n");
    listar_alunos(raiz);
    printf("Escolha o ID do cartao para alterar status de pagamento: ");
    scanf("%d", &cartao_id);

    Aluno* aluno = buscar_aluno(raiz, cartao_id);
    if (aluno != NULL) {
        printf("Pagamento em dia? (1 para sim, 0 para nao): ");
        scanf("%d", &aluno->pagamento_em_dia);
        printf("Status de pagamento atualizado!\n");
    } else {
        printf("Aluno nao encontrado!\n");
    }
}

// Função para desativar um aluno
void desativar_aluno() {
    int cartao_id;
    printf("\n=== Alunos Cadastrados ===\n");
    listar_alunos(raiz);
    printf("Escolha o ID do cartao para desativar aluno: ");
    scanf("%d", &cartao_id);

    Aluno* aluno = buscar_aluno(raiz, cartao_id);
    if (aluno != NULL) {
        aluno->ativo = 0;
        printf("Aluno desativado!\n");
    } else {
        printf("Aluno nao encontrado!\n");
    }
}

// Função para remover um aluno (marca como inativo)
Aluno* excluir_aluno(Aluno* raiz, int cartao_id) {
    if (raiz == NULL) return NULL;

    if (cartao_id < raiz->cartao_id) {
        raiz->esquerda = excluir_aluno(raiz->esquerda, cartao_id);
    } else if (cartao_id > raiz->cartao_id) {
        raiz->direita = excluir_aluno(raiz->direita, cartao_id);
    } else {
        raiz->ativo = 0;  // Marca o aluno como inativo
        printf("Aluno excluido com sucesso!\n");
    }
    return raiz;
}

// Função para liberar o acesso à catraca
void liberar_acesso() {
    int cartao_id;
    printf("\n=== Alunos Cadastrados ===\n");
    listar_alunos(raiz);
    printf("Escolha o ID do cartao para liberar acesso: ");
    scanf("%d", &cartao_id);

    Aluno* aluno = buscar_aluno(raiz, cartao_id);
    if (aluno != NULL) {
        if (aluno->ativo && aluno->pagamento_em_dia) {
            printf("Acesso liberado para %s\n", aluno->nome);
        } else {
            printf("Acesso negado. Aluno inativo ou pagamento pendente.\n");
        }
    } else {
        printf("Cartao nao registrado.\n");
    }
}

// Função para exibir o menu
void exibir_menu() {
    printf("\n=== Sistema de Transporte Escolar ===\n");
    printf("1. Cadastrar Aluno\n");
    printf("2. Alterar Plano\n");
    printf("3. Alterar Status de Pagamento\n");
    printf("4. Desativar Aluno\n");
    printf("5. Excluir Aluno\n");
    printf("6. Liberar Acesso\n");
    printf("7. Listar Alunos\n");
    printf("0. Sair\n");
    printf("Escolha uma opcao: ");
}

int main() {
    int opcao;
    char nome[50], plano[20];
    int pagamento_em_dia;

    while (1) {
        exibir_menu();
        scanf("%d", &opcao);
        
        switch (opcao) {
            case 1:
                printf("Nome do aluno: ");
                scanf(" %[^\n]", nome);
                printf("Escolha o plano (mensal/trimestral/anual): ");
                scanf("%s", plano);
                printf("Pagamento em dia? (1 para sim, 0 para nao): ");
                scanf("%d", &pagamento_em_dia);

                raiz = inserir_aluno(raiz, criar_aluno(nome, plano, pagamento_em_dia));
                printf("Aluno cadastrado com sucesso! ID do cartao: %d\n", total_alunos);
                break;

            case 2:
                alterar_plano();
                break;

            case 3:
                alterar_status_pagamento();
                break;

            case 4:
                desativar_aluno();
                break;

            case 5:
                printf("\n=== Alunos Cadastrados ===\n");
                listar_alunos(raiz);
                printf("Escolha o ID do cartao para excluir aluno: ");
                int cartao_id;
                scanf("%d", &cartao_id);
                raiz = excluir_aluno(raiz, cartao_id);
                break;

            case 6:
                liberar_acesso();
                break;

            case 7:
                printf("\n=== Alunos Cadastrados ===\n");
                listar_alunos(raiz);
                break;

            case 0:
                printf("Saindo do sistema.\n");
                return 0;

            default:
                printf("Opcao invalida! Tente novamente.\n");
        }
    }

    return 0;
}
