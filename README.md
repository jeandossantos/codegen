# Gerador de Código

## Sobre o projeto

CLI para criar um ou vários pacotes com recursos(repository, service, controller, factory) automaticamente.

## Como funciona

Dado um projeto com a seguinte estrutura:

![codegen](https://github.com/jeandossantos/assets/blob/master/codegen/before-codegen.png)

depois de executar o comando abaixo no terminal: 

```shell
codegen create --package-name user --package-name product --package-name order
```
ou 

```shell
codegen create -p user -p product -p order
```

deve gerar a seguinte estrutura:

![codegen](https://github.com/jeandossantos/assets/blob/master/codegen/after-codegen.png)

## Tecnologias utilizadas
- node.js
- yargs
- chalk
- jest para testes automatizados

## Autor
Jean dos Santos
