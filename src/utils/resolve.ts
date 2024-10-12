export const resolveCountryFlag = (country: string, theme: 'shiny'| 'flat', size: '16'|'24'|'32'|'48'|'64') => {
    return `https://flagsapi.com/${country || "VN"}/${theme || 'flat'}/${size || '64'}.png`
}