# UniCarona

Aplicativo móvel de caronas universitárias desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC). O UniCarona busca facilitar o encontro entre estudantes que realizam trajetos semelhantes, priorizando uma experiência simples, informações acadêmicas verificáveis e recursos de segurança durante a viagem.

> **Status:** protótipo funcional para fins acadêmicos. Os dados exibidos são simulados e permanecem apenas em memória; o projeto ainda não possui backend, autenticação real ou integração com serviços de localização.

## Funcionalidades

- apresentação, login e cadastro universitário;
- verificação por e-mail institucional ou comprovante de matrícula;
- busca e filtragem de caronas por origem, destino, horário e valor;
- consulta aos detalhes da rota, do motorista e das vagas disponíveis;
- solicitação de vaga em uma carona;
- criação e revisão de ofertas de carona;
- gerenciamento de ofertas e solicitações recebidas;
- acompanhamento simulado de uma viagem em andamento;
- compartilhamento de rota, emergência, denúncia e bloqueio de usuário;
- avaliação da viagem por nota, critérios rápidos e comentário;
- perfil acadêmico com situação da verificação e histórico resumido.

## Tecnologias

- [React Native](https://reactnative.dev/) e [React](https://react.dev/);
- [Expo](https://expo.dev/) e EAS Build;
- TypeScript;
- React Navigation (Native Stack e Bottom Tabs);
- Expo Vector Icons;
- React Native Gesture Handler e Safe Area Context.

## Como executar

### Pré-requisitos

- Node.js em uma versão LTS;
- npm;
- Expo Go em um dispositivo compatível ou um emulador Android/iOS configurado.

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/LucasWithBoots/unicarona.git
cd unicarona
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Após a inicialização, use o QR Code no Expo Go ou escolha uma das opções apresentadas no terminal.

Também estão disponíveis os comandos:

```bash
npm run android  # executa o projeto Android nativo
npm run ios      # executa o projeto iOS nativo (requer macOS)
npm run web      # abre a versão web
npm run lint     # verifica o código com ESLint
```

O projeto utiliza `expo-dev-client`. Dependendo dos recursos nativos e da plataforma utilizada, pode ser necessário gerar e instalar um development build em vez de usar o Expo Go.

## Estrutura do projeto

```text
unicarona/
├── assets/                 # ícones e recursos visuais
├── src/
│   ├── components/         # componentes reutilizáveis da interface
│   ├── context/            # estado local e operações do protótipo
│   ├── data/               # usuários, caronas e avaliações simuladas
│   ├── navigation/         # pilha principal e menu inferior
│   ├── screens/            # telas e fluxos do aplicativo
│   ├── theme/              # cores, espaçamentos, tipografia e sombras
│   └── types/              # tipos e interfaces TypeScript
├── App.tsx                 # ponto de entrada do aplicativo
├── app.json                # configuração do Expo
└── eas.json                # perfis de build do EAS
```

## Fluxo principal

1. O usuário acessa a apresentação, realiza o cadastro e escolhe um método de verificação universitária.
2. Na página inicial, consulta caronas sugeridas ou aplica filtros.
3. Pode visualizar os detalhes e solicitar uma vaga, ou publicar sua própria oferta.
4. O motorista acompanha e responde às solicitações recebidas.
5. Durante a viagem, o protótipo apresenta ações de segurança e, ao final, permite registrar uma avaliação.

## Dados e limitações

O estado da aplicação é mantido pelo `AppDataContext`. Novas ofertas, solicitações e alterações realizadas durante a execução não são persistidas após o aplicativo ser reiniciado. As ações de verificação, emergência, localização, denúncia e compartilhamento de rota representam fluxos de interface e não acionam serviços externos.

Para uma versão de produção, ainda seriam necessários, entre outros pontos:

- API e banco de dados persistente;
- autenticação e recuperação de conta;
- validação segura do vínculo universitário;
- mapas, geolocalização e acompanhamento da rota;
- notificações e comunicação entre usuários;
- políticas de privacidade, moderação e tratamento de incidentes;
- testes automatizados, testes de segurança e monitoramento.

## Contexto acadêmico

O UniCarona foi desenvolvido para investigar a aplicação de conceitos de Experiência do Usuário, Design Centrado no Usuário e prototipação em uma solução de mobilidade universitária. O protótipo serve como artefato do TCC e não representa um serviço comercial disponível ao público.

## Autor

Desenvolvido por [Lucas](https://github.com/LucasWithBoots).
