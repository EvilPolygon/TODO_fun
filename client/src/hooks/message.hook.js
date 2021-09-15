import {useCallback} from 'react'

//вывод небольших сообщений на экран

export const useMessage = () => {
    return useCallback( text => {
        if(window.M && text){
            window.M.toast({ html: text})
        }
    }, [])
}