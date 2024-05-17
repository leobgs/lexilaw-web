export const addIsEditChat = (data) => {
  return data.map((section) => {
    const updatedData = section.data.map((item) => {
      const updatedItem = { ...item, isEdit: false }

      if (item.childs) {
        updatedItem.childs = item.childs.map((child) => ({
          ...child,
          isEdit: false,
          chat: child.chat
            ? child.chat.map((chatItem) => ({ ...chatItem, isEdit: false }))
            : undefined,
        }))
      }

      if (item.chat) {
        updatedItem.chat = item.chat.map((chatItem) => ({
          ...chatItem,
          isEdit: false,
        }))
      }

      return updatedItem
    })

    return { ...section, data: updatedData }
  })
}
