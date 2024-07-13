export type AdvanceFilterPayload = {
  modelType: string
  conditions: Record<string, any>
  stringPreLoad: string[]
  isPreload: boolean
  page: number
  pageSize: number
}