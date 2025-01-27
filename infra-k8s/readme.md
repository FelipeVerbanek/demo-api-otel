# README

Este repositório contém as configurações necessárias para o deploy de uma API HTTP e um banco de dados PostgreSQL em um cluster Kubernetes.

## Estrutura do Repositório

- **`postgres/`**
  Contém os arquivos de configuração para o deploy do banco de dados PostgreSQL no Kubernetes. Inclui:
  - `Deployment`: para gerenciar os pods do PostgreSQL.
  - `Service`: para expor o banco de dados dentro do cluster.
  - `Secret`: Credenciais do banco de dados.
  - `ConfigMap`: Variaveis de ambiente
  - `Volume`: Volumes destinado ao banco de dados 

- **`demo-api-otel/`**
  Contém os arquivos de configuração para o deploy da API HTTP no Kubernetes. Inclui:
  - `Deployment`: para gerenciar os pods da API.
  - `Service`: para expor a API.
  - `ConfigMap`: Variaveis de ambiente

## Como Usar

1. **Certifique-se de que o cluster Kubernetes está configurado** e que você tem acesso ao `kubectl`.
2. Aplique os manifests de cada pasta utilizando o comando:

   ```bash
   kubectl apply -f <pasta>
   ```

   Por exemplo, para deploy do PostgreSQL:

   ```bash
   kubectl apply -f postgresql/...
   ```

   E para a API HTTP:

   ```bash
   kubectl apply -f api/...
   ```

3. Verifique se os pods estão em execução:

   ```bash
   kubectl get pods
   ```