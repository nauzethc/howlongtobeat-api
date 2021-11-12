# howlongtobeat-api

Promise based API to get data from HowLongToBeat.com web.

## Features

- Typescript support
- Search games with filtering options
- Complete detailed game data (including time tables)

Inspired by [@ckatzorke](https://github.com/ckatzorke/howlongtobeat) project

### Dependencies

- Axios (requests)
- Cheerio (HTML scrapper)

## Installing

Using npm:

```bash
$ npm install howlongtobeat-api
```

Using yarn:

```bash
$ yarn install howlongtobeat-api
```

## API

```typescript
howlongtobeat.find(query: Query = {}): Promise<{ total: number, data: GameResult[] }>

howlongtobeat.get(id: number): Promise<GameDetail>
```

## Example

```javascript
import howlongtobeat from 'howlongtobeat-api'

// Find games
howlongtobeat
  .find({ search: 'bayonetta' })
  .then(results => {
    /*
      Receive object with total number and results (max. 20 from total)
      {
        total: 5,
        data: [
          {
            id: 966,
            name: "Bayonetta",
            imageUrl: "...",
            gameplayMain: 11.5,
            gameplayExtended: 15.5,
            gameplayCompletionist: 42.5
          },
          ...
        ]
      }
    */
  })
  .catch(err => {
    // Request failed
  })

// Get game by ID
howlongtobeat
  .get(966)
  .then(game => {
    /*
      Receive object with game properties
      {
        id: 966,
        name: "Bayonetta",
        developers: ["PlatinumGames"],
        platforms: ["Nintendo Switch", ...],
        genres: ["Action", ...],
        publishers: ["Sega", ...],
        description: "...",
        releaseDates: {
          NA: "January 05, 2010",
          ...
        },
        ...
        gameplays: {
          single: [
            {
              type: "Main Story",
              average: "11h 31m",
              median: "11h 10m",
              ...
            },
            ...
          ],
          platforms: [
            {
              platform: "Nintendo Switch",
              main: "11h 42min",
              extended: "16h 42min",
              completionist: "48h 12min",
              ...
            }
          ]
        }
      }
    */
  })
  .catch(err => {
    // Game not found or request failed
  })
```

## Typescript

```typescript
import { find, GameResult, Query, Platform, SortBy } from 'howlongtobeat-api'

// Write your own code with types
async function findHaloGames (): void {
  try {
    const query: Query = {
      search: 'halo',
      platform: Platform.Xbox360,
      sortBy: SortBy.ReleaseDate
    }
    const results: { total: number; data: GameResult[] } = await find(query)
    console.log(results.data)
  } catch (err) {
    console.log(err)
  }
}
```

## Query format

```typescript
{
  // Search pattern to find games
  search: '',

  // Pagination (max. 20 results per page)
  page: 1,

  // Gameplay length type to use on min and max
  lengthType: LengthType.Main, // 'main'

  // Min and max values to restrict search data
  lengthMin: '',
  lengthMax: '',

  // Sorting: 'popular', 'rating', ...
  sortBy: SortBy.Popular,
  // '0' for descending, '1' for ascending
  sortOrder: SortOrder.Descending,

  // Filters
  platform: Platforms.All, // default: ''
  perspective: Perspective.All, // default: ''
  flow: Flow.All, // default: ''
  genre: Genre.All, // default: ''
  modifier: Modifier.None, // default: ''

  // Get one random game result
  randomize: false
}
```
