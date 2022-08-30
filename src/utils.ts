export const getRootDomain = (url: string) => {
    //Regex doesn't work without protocol, so add a default one
    if (!url.includes('://')) {
        url = 'http://' + url
    }

    const regex = /^.*:\/\/(?:[wW]{3}\.)?([^:\/]*).*$/gm
    const result = regex.exec(url)
    if (result && result.length > 1) {
        return result[1]
    }
    throw new Error(`Cannot get root domain for "${url}"`)
}

export const getLnurlObject = (params: URLSearchParams, obj: string): string => {
    return params.get(obj) ?? ''
}