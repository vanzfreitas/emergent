# PRD — KSV Soluções Integradas (Landing Page B2B)

## Problem statement original
Landing page profissional, premium e funcional para a KSV Soluções Integradas com foco em GERAR LEADS e solicitações de orçamento para OBRAS, REFORMAS, ADEQUAÇÕES e INFRAESTRUTURA (B2B). Climatização e manutenção como serviços complementares. Requisitos: formulário real com upload, registro de leads em banco, e-mail para contato@ksvsolucao.com.br com assunto exato "Formulario KSV Site", estrutura de notificação WhatsApp, botão WhatsApp (71) 98137-6609, SEO, responsivo, LGPD básica, sem inventar clientes/números/depoimentos.

## Arquitetura
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll) — landing one-page com âncoras + páginas legais (/politica-de-privacidade, /termos-de-uso)
- Backend: FastAPI (/api prefix) — POST /api/leads (multipart, upload até 5 arquivos/15MB), GET /api/config (dados públicos), GET/PATCH /api/leads (admin, X-Admin-Key), GET /api/health
- Banco: MongoDB (collection `leads`) — lead salvo SEMPRE antes das notificações; email_status e whatsapp_status registrados por lead
- E-mail: proxy gerenciado Emergent (Resend) via EMERGENT_EMAIL_KEY — assunto fixo "Formulario KSV Site"
- WhatsApp: notificação automática preparada (dispara quando WHATSAPP_API_URL + WHATSAPP_API_TOKEN forem configurados); botão do site usa WHATSAPP_SITE_NUMBER=5571981376609
- Anti-spam: honeypot (campo "website") + rate limit 5 req/10min por IP

## Personas
- Donos de lojas, farmácias, clínicas, academias, escritórios e condomínios comerciais
- Administradoras, gestores prediais e facility managers
- Empresas que precisam adaptar/reformar espaços em Lauro de Freitas, Salvador e região

## Requisitos core (estáticos)
1. Hierarquia visual: OBRAS > REFORMAS > ADEQUAÇÕES > INFRAESTRUTURA > complementares
2. CTA primário "Solicitar orçamento", secundário "Falar com a KSV"
3. Cores: preto/branco/prata + laranja #FF6B00 só em CTAs/destaques
4. Nunca inventar clientes, números, depoimentos, certificações
5. Assunto do e-mail: exatamente "Formulario KSV Site"

## Implementado (14/09/2026)
- Hero cinético com reveal mascarado linha a linha + parallax na imagem de obra
- Marquee editorial lenta com os pilares de serviço
- 6 cards de Obras e Reformas (textos exatos do brief)
- Processo de trabalho 01–06 (textos exatos do brief)
- Diferenciais (7 itens, sem invenções), Projetos (galeria com placeholders identificados), Segmentos B2B (7), Serviços complementares (subordinados)
- Formulário funcional com validação, upload de arquivos, mensagens exatas de sucesso/erro, protocolo KSV-AAAAMMDD-XXXXXX
- Registro de leads em MongoDB (nunca perde lead mesmo se e-mail falhar) + endpoint admin protegido
- E-mail via Resend gerenciado (fluxo verificado com delivered@resend.dev)
- Botão flutuante WhatsApp + CTAs com mensagem pré-preenchida — número (71) 98137-6609
- SEO (title/meta/keywords exact), LGPD (banner de consentimento + páginas legais editáveis)
- Design industrial premium: Barlow Condensed / DM Sans / JetBrains Mono, dark theme, lenis + framer-motion

## Pendências conhecidas
- E-mail para contato@ksvsolucao.com.br: BLOQUEADO pelo provedor pois a caixa de entrada não existe ainda (erro "undeliverable recipient"). Assim que a caixa for criada no domínio ksvsolucao.com.br, os e-mails passam a chegar automaticamente. Leads ficam salvos no banco de qualquer forma.
- Notificação WhatsApp: aguardando credenciais de API (WhatsApp Business Cloud API, Z-API ou Evolution API) — configurar WHATSAPP_API_URL e WHATSAPP_API_TOKEN no backend/.env
- Instagram: espaço configurável (INSTAGRAM_URL no backend/.env), oculto até ser definido
- Fotos reais de projetos: substituir placeholders da galeria

## Backlog priorizado
- P0: Criar caixa contato@ksvsolucao.com.br no provedor do domínio (desbloqueia e-mails)
- P0: Configurar API de WhatsApp para notificações automáticas da equipe
- P1: Substituir placeholders da galeria por fotos reais das obras
- P1: Painel admin visual para gestão de leads (hoje via API com X-Admin-Key)
- P2: Instagram ativo no rodapé
- P2: Blog/conteúdo para SEO local
