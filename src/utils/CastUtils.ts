// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Cast(obj: any, newObj: any): any{
    const keys = Object.keys(newObj)
    const result = {}
    
    keys.forEach((key) => {
        if(obj[key]){
            result[key] = obj[key]
        }
    })

    return result
}