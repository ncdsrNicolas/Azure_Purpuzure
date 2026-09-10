# 1. Definir o provedor (Azure)
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

# 2. Configurar as funcionalidades do Provedor
provider "azurerm" {
  features {}
}

# 3. Criar o Grupo de Recursos
resource "azurerm_resource_group" "rg" {
  name     = "grupoPurpuzureCompNuvem" #
  location = "EAST US"
}

# 4. Criar o Azure Container Registry (ACR) Docker Registry Privado
resource "azurerm_container_registry" "acr" {
  name                = "purpuzurecompnuvem" #
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true # Ativa usuário/senha para facilitar o acesso inicial
}

# 5. Criar a Instância de Container (ACI)
resource "azurerm_container_group" "aci" {
  name                = "aci-purpuzure"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  ip_address_type     = "Public"
  dns_name_label      = "purpuzure-app-2026" # Precisa ser único na Azure
  os_type             = "Linux"

  # Credenciais para o ACI conseguir baixar a imagem do ACR privado
  image_registry_credential {
    server   = azurerm_container_registry.acr.login_server
    username = azurerm_container_registry.acr.admin_username
    password = azurerm_container_registry.acr.admin_password
  }

  container {
    name   = "purpuzure-frontend"
    image  = "${azurerm_container_registry.acr.login_server}/viteex1-frontend:v1"
    cpu    = "0.5"
    memory = "1.5"

    ports {
      port     = 80
      protocol = "TCP"
    }
  }
}

# 6. Mostrar a URL de acesso no terminal após a criação
output "ip_address" {
  value = azurerm_container_group.aci.ip_address
}

output "app_url" {
  value = "http://${azurerm_container_group.aci.fqdn}"
}