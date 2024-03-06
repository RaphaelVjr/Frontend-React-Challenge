
# Kendo Movies Project Job Apply

A movie web app that consume an large movies API from TMDB.


## Features

- Login Page
- Sign-up Page
- Responsivity for mobile in all screens.
- Movie posters cards
- Admin dashboard to import more movies


## Clone repostory

Clone repository

```http
git clone https://github.com/RaphaelVjr/frontend.git
```

## Installation Node (Required)

You need to install:

- [Node]

And set the respective environment variable for your user on windows:
- Open the Start menu and search for `Environment Variables`.
- Click on `Environment Variables` in the dialog that appears.
- In the `System Variables` section, look for the variable named `Path` and edit it.
- Add the path to your npm installation directory (usually located at C:\Program Files\nodejs).
- Click `OK` to save the changes.


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Node]: <https://nodejs.org/en>

    
## Environment Variables

Check if this is set for the `.env` file.

`REACT_APP_API_URL=http://127.0.0.1:3000`

`HOST=127.0.0.1`

`PORT=3001`


## Preparing to run project

After clone the repository, you need to install all dependencies.

```http
npm install
```


## CSV Import file
## API Documentation

#### Return top rated movies:


```http
  GET https://api.themoviedb.org/3/movie/
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `ApiKey` | `string` | **Must have**. Authentication key from the tmdb |

Receive a JSON response.

#### Return the credits and crew of a all fetched movies by id:

```http
  GET https://api.themoviedb.org/3/movie/${movie.id}/credits?${ApiKey}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `ApiKey`      | `string` | **Must have**. Authentication key from the tmdb |

#### What this api url do?

Receive the director of the movie;

#### Posters image:

```http
  GET https://image.tmdb.org/t/p/w500${data.results[0].poster_path}
```

#### What this api url do?

Get the poster of the respective movie with base on the title;


## Running Tests

To run tests in the repository using Jest you need to:

```bash
  npm test
```


## Stacks

**Front-end:** [React], [Kendo UI] (Click to know more).

**Back-end ([Repository]):** Ruby On Rails, Redis and Sidekiq.




[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [React]: <https://nodejs.org/en>
   [Kendo UI]: <https://www.telerik.com/kendo-react-ui/components/getting-started/>
   [Repository]: <https://github.com/RaphaelVjr/Ruby-Backend-Project>

## Melhorias

Que melhorias você fez no seu código? Ex: refatorações, melhorias de performance, acessibilidade, etc

## Color Documentation

| Cor               | Hexadecimal                                                |
| ----------------- | ---------------------------------------------------------------- |
| Primary Color       | ![#FDFDFD](https://via.placeholder.com/10/FDFDFD?text=+) #FDFDFD |
| Secondary Color       | ![#EAEAEA](https://via.placeholder.com/10/EAEAEA?text=+) #EAEAEA |
| Make color       | ![#015ABA](https://via.placeholder.com/10/015ABA?text=+) #015ABA |
| Inputs | ![#797979](https://via.placeholder.com/10/#797979?text=+) #797979|


## Demonstração

Insira um gif ou um link de alguma demonstração


## Kendo License

[Kendo UI](https://choosealicense.com/licenses/mit/)

