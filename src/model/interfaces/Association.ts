import type Coords from "@/model/interfaces/Coords"
import type Thematic from "@/model/interfaces/Thematic"

export default interface Association {
  id: number
  name: string
  updatedAt?: string
  country: string
  coords: Coords
  adress?: string
  indic?: string
  tel?: string
  telOther?: string
  emails?: string[]
  websiteUrl?: string
  status?: string
  year?: number
  budget?: string
  dialog?: string
  intervention?: string
  thematics: Thematic['value'][]
}