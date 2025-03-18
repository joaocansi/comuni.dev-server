terraform {
  required_providers {
    render = {
      source = "render-oss/render"
      version = "1.6.0"
    }
    aiven = {
      source = "aiven/aiven"
    }
  }
}

provider "aiven" {
  api_token = var.aiven_api_token
}

resource "aiven_pg" "pg" {
  project = var.aiven_project_name
  cloud_name = "google-europe-west1"
  plan = "hobbyist"
  service_name = "comuni-dev"
}

resource "render_web_service" "web" {
  depends_on = [ aiven_pg.pg ]

  name               = "terraform-web-service"
  plan               = "starter"
  region             = "oregon"
  start_command      = "npm run start:prod" 

  runtime_source = {
    native_runtime = {
      auto_deploy   = true
      branch        = "main"
      build_command = "npm install --legacy-peer-deps && npm run build"
      build_filter = {
        paths         = ["src/**"]
      }
      repo_url = "https://github.com/joaocansi/comuni.dev-server"
      runtime  = "node"
    }
  }

  disk = {
    name       = "comuni-dev"
    size_gb    = 1
    mount_path = "/data"
  }

  env_vars = {
    "BETTER_AUTH_SECRET" = { value = var.better_auth_secret },
    "DATABASE_URL" = { value = "postgresql://${aiven_pg.pg.service_username}:${aiven_pg.pg.service_password}@${aiven_pg.pg.service_host}:${aiven_pg.pg.service_port}/defaultdb?schema=public&sslmode=require" }
    "GOOGLE_CLIENT_ID" = { value = var.google_client_id },
    "GOOGLE_CLIENT_SECRET" = { value = var.google_client_secret  }
  }

  notification_override = {
    preview_notifications_enabled = "false"
    notifications_to_send         = "failure"
  }

  log_stream_override = {
    setting = "drop"
  }
}

output "url" {
  value = render_web_service.web.url
}