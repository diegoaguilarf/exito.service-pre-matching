import { IOClients } from '@vtex/api'

import Search from './search'
import Suggestions from './suggestions'
import Matching from './matching'
// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get search() {
    return this.getOrSet('search', Search)
  }

  public get suggestions() {
    return this.getOrSet('suggestions', Suggestions)
  }

  public get matching() {
    return this.getOrSet('matching', Matching)
  }
}
