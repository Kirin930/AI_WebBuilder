# Product Requirements Document (PRD)
## Self-Hosted Web Builder with AI Agent

---

## 1. Overview

This project aims to create a **self-hosted web builder platform** running on **Ubuntu Server 24.04**, where:

- **Strapi** acts as the CMS, page modeler, and content API
- A **frontend web builder** renders pages dynamically from Strapi
- A **dedicated AI agent (Qwen3-coder-next)** can:
  - Modify content
  - Modify layouts and components
  - Edit configuration and code (within defined boundaries)
- All data and logic remain **fully local and self-hosted**

The system should allow a user to say things like:
> “Add a hero section with a CTA button”  
> “Change the layout to a two-column grid”  
> “Create a new landing page for product X”

…and have the AI **actually perform those changes**.

---

## 2. Goals

### Primary Goals
- Fully self-hosted (no SaaS dependencies)
- Deterministic, auditable AI changes
- Modular and extensible architecture
- Clear separation between:
  - Content
  - Layout
  - Logic
  - AI control

### Non-Goals
- No drag-and-drop GUI (initially)
- No visual editor in v1
- No public multi-tenant support

---

## 3. Target Environment

### Hardware / OS
- Ubuntu Server 24.04 LTS
- x86_64
- Minimum:
  - 4 CPU cores
  - 16 GB RAM
  - 50 GB disk

### Runtime Stack
- Docker + Docker Compose
- Node.js (inside containers)
- PostgreSQL
- Nginx (reverse proxy)
- Local LLM runtime (Ollama or vLLM)

---

## 4. High-Level Architecture

┌──────────────────────┐
│       Browser        │
└─────────┬────────────┘
│ HTTP
┌─────────▼────────────┐
│        Nginx          │
│  (Reverse Proxy)     │
└───────┬───────┬──────┘
│       │
┌───────▼───┐ ┌─▼────────────────┐
│ Frontend  │ │      Strapi       │
│ (Builder) │ │  CMS + Page Model │
└───────┬───┘ └───────┬───────────┘
│ API         │
└───────┬─────┘
│
┌───────▼────────┐
│   AI Agent     │
│ Qwen3-coder    │
│ (Tool-Driven)  │
└────────────────┘

---

## 5. Core Components

### 5.1 Strapi (WebBuilder Backend)

**Responsibilities**
- Page definitions
- Component schemas
- Content blocks
- Global site settings

**Key Content Types**
- Page
- Section
- Component
- Theme
- Navigation
- Asset

**Critical Requirement**
Layouts and components must be **data-driven**, not hardcoded.

---

### 5.2 Frontend Builder

**Responsibilities**
- Render pages dynamically from Strapi JSON
- Map Strapi components → frontend components
- Hot reload on content changes

**Tech Choice (v1)**
- Next.js or Vite + React
- TailwindCSS
- Component registry pattern

---

### 5.3 AI Agent (Qwen3-coder-next)

**Responsibilities**
- Understand user intent
- Plan changes
- Execute changes via tools
- Never directly mutate state without validation

**Allowed Actions**
- Modify Strapi entries via REST API
- Edit frontend component files
- Create new components/pages
- Run schema migrations

**Forbidden Actions**
- Arbitrary shell execution
- Direct DB writes
- Self-modifying agent code

---

## 6. AI Control Model

### Tool-Based Architecture

The AI agent does **NOT**:
- Free-form edit files
- “Guess” changes

Instead, it uses **explicit tools**, for example:

- `create_page(page_schema)`
- `update_section(section_id, diff)`
- `create_component(component_definition)`
- `edit_file(path, patch)`

All tools:
- Are logged
- Are reversible
- Can be dry-run

---

## 7. Data Flow

1. User sends instruction
2. AI parses intent
3. AI produces a **plan**
4. Plan is validated
5. Tools are executed
6. Strapi updates content
7. Frontend re-renders

---

## 8. Security Considerations

- AI agent runs in isolated container
- Read-only filesystem by default
- Tool permission system
- API tokens scoped per action
- No root access

---

## 9. Milestones

### v0 – Infrastructure
- Dockerized stack
- Strapi running
- Frontend renders static page

### v1 – Web Builder
- Dynamic pages from Strapi
- Component registry
- Page creation via API

### v2 – AI Agent
- Local LLM running
- Tool execution framework
- Controlled mutations

### v3 – Intelligence
- Multi-step planning
- Diff previews
- Rollback support

---

## 10. Success Criteria

- A page can be created via AI instruction
- A layout can be changed via AI instruction
- All changes are inspectable and reversible
- No cloud dependencies

---