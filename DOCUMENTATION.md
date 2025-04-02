# TechStore - Sistema de Gerenciamento de Produtos

Este documento descreve o sistema de gerenciamento de produtos desenvolvido para a TechStore, uma loja virtual fictícia. O sistema permite realizar operações CRUD (Create, Read, Update, Delete) para produtos, com uma interface amigável e intuitiva.

## Tecnologias Utilizadas

### Back-end
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM (Object Data Modeling) para MongoDB

### Front-end
- **React** - Biblioteca JavaScript para criação de interfaces
- **React Router** - Para navegação entre páginas
- **Axios** - Cliente HTTP para requisições à API
- **CSS3** - Para estilização

## Estrutura do Projeto

```
techstore/
├── backend/               # Código do servidor
│   ├── models/            # Definição do esquema de dados
│   ├── routes/            # Rotas da API
│   ├── package.json       # Dependências do back-end
│   └── server.js          # Ponto de entrada do servidor
└── frontend/              # Código da interface do usuário
    ├── public/            # Arquivos estáticos
    │   └── images/        # Imagens dos produtos
    ├── src/               # Código-fonte React
    │   ├── components/    # Componentes React
    │   ├── App.css        # Estilos da aplicação
    │   ├── App.js         # Componente principal
    │   └── index.js       # Ponto de entrada do React
    └── package.json       # Dependências do front-end
```

## Funcionalidades Implementadas

1. **Cadastro de produtos** - Adição de novos produtos com nome, descrição, preço, quantidade em estoque e categoria.
2. **Listagem de produtos** - Visualização de todos os produtos cadastrados com suas informações.
3. **Edição de produtos** - Atualização dos dados de produtos existentes.
4. **Exclusão de produtos** - Remoção de produtos do sistema.
5. **Validação de dados** - Garantia da integridade dos dados fornecidos pelo usuário.
6. **Filtragem por categoria** - Possibilidade de filtrar produtos por categoria.
7. **Interface responsiva** - Design que se adapta a diferentes tamanhos de tela.

## Instruções para Execução do Projeto

### Pré-requisitos

- Node.js (versão 14.x ou superior)
- MongoDB (versão 4.x ou superior)
- NPM (Node Package Manager) ou Yarn

### Configuração do Banco de Dados

1. Instale o MongoDB em sua máquina (caso ainda não tenha).
2. Inicie o serviço do MongoDB:
   ```
   sudo service mongod start
   ```
   ou
   ```
   mongod
   ```

### Configuração do Back-end

1. Navegue até a pasta `backend`:
   ```
   cd techstore/backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor:
   ```
   npm run dev
   ```
   
   O servidor estará disponível em `http://localhost:5000`.

### Configuração do Front-end

1. Navegue até a pasta `frontend`:
   ```
   cd ../frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie uma pasta para imagens:
   ```
   mkdir -p public/images
   ```

4. Adicione imagens representativas para cada categoria de produto na pasta `public/images` com os seguintes nomes:
   - celular.jpg
   - notebook.jpg
   - switch.jpg
   - ap.jpg
   - impressora.jpg
   - default.jpg (imagem padrão)

5. Inicie a aplicação React:
   ```
   npm start
   ```
   
   A interface estará disponível em `http://localhost:3000`.

## Possíveis Melhorias Futuras

1. **Autenticação e autorização**
   - Implementar sistema de login para administradores
   - Níveis de acesso diferentes para funcionários e administradores

2. **Expansão de recursos**
   - Upload de imagens reais para produtos
   - Sistema de categorias dinâmicas
   - Tags para produtos
   - Campos adicionais como código de barras, SKU, dimensões

3. **Integrações**
   - Conexão com sistemas de pagamento
   - Integração com sistemas de estoque
   - API para integração com lojas físicas

4. **Experiência do usuário**
   - Tema escuro/claro
   - Dashboard com estatísticas de produtos
   - Notificações de baixo estoque
   - Histórico de alterações nos produtos

5. **Performance e escalabilidade**
   - Implementação de cache
   - Paginação na listagem de produtos
   - Otimização de consultas ao banco de dados
   - Containerização com Docker para facilitar o deploy

6. **Funcionalidades adicionais**
   - Sistema de busca avançada
   - Exportação de relatórios (CSV, PDF)
   - Importação em massa de produtos
   - Gestão de fornecedores

## Contato

Para suporte técnico ou mais informações sobre o sistema, entre em contato com a equipe de desenvolvimento da TechStore.
