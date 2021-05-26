import { IOClients } from '@vtex/api'

import Search from './search'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get search() {
    return this.getOrSet('search', Search)
  }
}
