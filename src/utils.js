export const updateObject =  (oldObject, updatedData) => {
    return {
          ...oldObject,
          ...updatedData
    }
}