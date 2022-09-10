<h1 align="center">How To Build a Self-Sovereign Identity Agent With Hyperledger Aries Framework JavaScript</h1>
<h4 align="center">14 September 2022 | 09:00 - 12:30</h4>
<h5 align="center">Jakub Koci, Timo Glastra and Berend Sliedrecht</h5>
<p align="center">
<br>
<br>
<br>
<img
  alt="Hyperledger Aries logo"
  src="https://raw.githubusercontent.com/hyperledger/aries-framework-javascript/aa31131825e3331dc93694bc58414d955dcb1129/images/aries-logo.png"
  height="250px"
/>
<br>
<br>
<br>
</p>

Link to our discord: https://discord.gg/VkmcsFTH

Link to the Hyperledger Global Forum Channel: https://discord.com/channels/905194001349627914/1017366759168286753

## Table of content

- [Context](#Context)
- [Section 1: Agent Initialization](#Section-1:-Agent-Initialization)
- [Section 2: Receiving An Invitation](#Section-2:-Receiving-An-Invitation)
- [Section 3: Accepting A Credential](#Section-3:-Accepting-A-Credential)
- [Section 4: Sharing A Proof](#Section-4:-Sharing-A-Proof)

## Context

Everything that will be programmed within this workshop will be done in the
`src/workshop/` folder. Every file exports a function that needs your
implementation the of the specific feature to make the application work again.

## Section 1: Agent Initialization

Before we even begin with creating a connection between two agents, we must
initialize our agent first. This will be done in the `agent-initialization.ts`
file.

The function here is called `initializeAgent` and it should return a class of
`Agent`. A very minimal agent does not need a lot, but there are some quirks
for specific environments, like React Native. In the configuration we can put
things like automatically accept all incoming credentials or the name of our
agent. The goal of this section is to configure it in a minimal way and check
what all our options are.

## Section 2: Receiving An Invitation

Now that our agent is setup, we can starting using it! The first thing we would
like to do is create a connection with another agent. This does require some
additional work in the agent configuration and some code where we use the
agent. The agent initialization will happen again in the
`agent-initialization.ts` file and the receiving of an invitation of another
agent will happen in the `receiving-an-invitation.ts` file.

The agent needs atleast the following attributes:

1. `autoAcceptConnection`
2. `mediation`
3. A configured wallet
4. In and outbound transport

Receiving the invitation happens in three steps:

1. Scanning a QR code with the invitaion url inside
2. Parsing the invitation url to a invitation object
3. Receiving the invitation on the agent

The application provides a scanner and for this section we only have to add a
parse invitation function and a receive invitation function.

## Section 3: Accepting A Credential

## Section 4: Sharing A Proof
