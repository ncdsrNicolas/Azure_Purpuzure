# Participantes
Gabriel Nobre, Gustavo, Kalebe, Lucas Henrique Neves, Nicolas - DSM 5

## Link

[Purpurzure]()

## Criar e Deletar o Terraform

```bash
# Criar

.\terraform.exe apply -auto-approve
# Logar e Subir Imagem
az acr login --name purpuzurecompnuvem
docker push purpuzurecompnuvem.azurecr.io/viteex1-frontend:v1

# Deletar
.\terraform.exe destroy -auto-approve
```
