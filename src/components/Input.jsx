import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {charPerMinute, fetchingWords, pressedButton, setAccuracy, setTypos} from '../redux/actions'
import Loader from './Loader'
import '../UI/homeContent/input.scss'


const Input = () => {
    // eslint-disable-next-line
    const [words, setWords] = useState()
    const [counter, setCounter] = useState(0)
    const [accurate, setAccurate] = useState(0)
    const dispatch = useDispatch()
    const sentence = useSelector(state => state.typing.typingWords)
    const [inputValue, setInputValue] = useState('')


    useEffect(() => {
        dispatch(fetchingWords())
        setWords(sentence)
    }, [])

    useEffect(() => {
        setWords(sentence)
    }, [sentence])

    const changeHandler = (event) => {
        setInputValue(event.target.value)
        setCounter(prev => prev + 1)
        dispatch(charPerMinute(counter / 5))
        words.startsWith(event.target.value) && setAccurate(prev => prev + 1)
        // const acc = ((accurate / counter) * 100) >= 100 ? 100 : ((accurate / counter) * 100)
        dispatch(setAccuracy(((accurate / counter) * 100) >= 100 ? 100 : ((accurate / counter) * 100)))
        dispatch(setTypos(counter - accurate))
    }

    const keyDownHandler = (event) => {
        const strArr = words.split(' ')
        let filtered = null
        if (strArr[0] === inputValue) {
            filtered = strArr.filter(e => e !== inputValue)
            filtered.push(inputValue)
            setWords(filtered.join(' '))
            setAccurate(prev => prev + 1)
        }
        if (event.code === 'Space') {
            setTimeout(() => {
                setInputValue('')
            }, 10)
        }
        if (event.key !== undefined) {
            dispatch(pressedButton(`button-${event.key}`))
            // setHelp(Date.now())
        } else if (event.which !== undefined) {

        }
    }
    if (!sentence.length) {
        return <Loader/>
    }
    return (
        <>
            <div className={'input-container'} style={{display: 'flex', flexDirection: 'column'}}>
                <input className={'input-container__item-1'} type={'text'} value={words}
                       onChange={() => {
                       }}
                       disabled
                />
                <input className={'input-container__item-2'} value={inputValue} type={'text'} onChange={changeHandler}
                       onKeyDown={keyDownHandler}
                       placeholder={'start typing'}
                >
                </input>
                <hr id={'hr'}/>
            </div>
        </>
    )
}

export default Input