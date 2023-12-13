# utiliza o node 18v como imagem base
FROM node:18.16.0

# define o diretório 'backend' como diretório principal
WORKDIR /home-app-backend/

# copia o arquivo package.json para dentro do diretório atual para o diretório principal do container
COPY package*.json .

# instala as dependências no container
RUN npm i

# copia todos os arquivos locais para dentro do container
COPY . .

# define através de porta vai o container vai comunicar 
EXPOSE 3001

# ------ Os comandos a seguir serão utlizados quando a aplicação estiver em produção ---------

# Executa um comando quando a imagem for transformada em um container
# ENTRYPOINT [ "npm", "run" ]

# CMD é uma sugestão de comando e é executado quando nenhum outro comando é passado.
# CMD ["start"]