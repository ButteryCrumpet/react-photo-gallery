
const copyToClipboard = (string: string): boolean => {
    const el = document.createElement('textarea')

    el.value = string
    el.contentEditable = "true"
    el.readOnly = true
    el.style.position = "absolute"
    el.style.height = "0px"
    el.style.width = "0px"
    el.style.fontSize = "40px"
    
    document.body.appendChild(el)
    el.select()
    el.setSelectionRange(0, string.length)
    const result = document.execCommand('copy')
    document.body.removeChild(el)
    return result
}

export default copyToClipboard