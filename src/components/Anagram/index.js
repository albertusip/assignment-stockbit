import React, { useState } from 'react';

import { wrapperResultAnagram } from './styles';
import { alert, Card, Wrapper, Button, Input, mb3, py3, pl4, Row, Col, w100 } from '../../styles';

export default function Anagram() {
    const [inputValue, setInputValue] = useState('');
    const [resultsAnagram, setResultsAnagram] = useState([]);

    const updateValue = (newValue) => {
        setInputValue(newValue);
    };

    const generateAnagram = () => {
        let result = {};
        let inputToArray = inputValue.split(' ');
        for (let word of inputToArray) {
            let doneSort = false;
            let sortWord = word.split('');
            while (!doneSort) {
                doneSort = true;
                for (var i = 1; i < sortWord.length; i += 1) {
                    if (sortWord[i - 1] > sortWord[i]) {
                        doneSort = false;
                        let tempWord = sortWord[i - 1];
                        sortWord[i - 1] = sortWord[i];
                        sortWord[i] = tempWord;
                    }
                }
            }
            
            if (result[sortWord]) {
                if (word) {
                    result[sortWord].push(word);
                }
            } else {
                if (word) {
                    result[sortWord] = [word];
                }
            }
        }
        const anagramObjectToArray = Object.values(result);
        setResultsAnagram(anagramObjectToArray);
    };

    return (
        <>
            <Wrapper fluid>
                <div className={`${alert} ${mb3}`}>
                    Type anagram word divided by space, Example: aku kua kau dia adi kamu
                </div>
                <Input
                    value={inputValue}
                    onChange={(input) => updateValue(input.target.value)}
                    className={`${w100} ${mb3}`}
                    placeholder="Type anagram word divided by space, Example: aku kua kau dia adi kamu"
                />
                <Button
                    disabled={inputValue === ''}
                    fluid
                    onClick={() => generateAnagram()}
                >
                    Generate Anagram
                </Button>
                {
                    resultsAnagram.length ? 
                    <>
                        <div className={`${py3}`}>
                            Anagram Result
                        </div>
                        <Row className={`${w100} ${wrapperResultAnagram}`}>
                            {
                                resultsAnagram.map((anagramList, idxList) => (
                                    <Col
                                        xs="12"
                                        sm="6"
                                        md="4"
                                        className={`${py3}`}
                                        key={idxList}
                                    >
                                        <Card>
                                            <ul className={`${pl4}`}>
                                                {
                                                    anagramList.map((item, idxItem) => (
                                                        <li key={idxItem}>{item}</li>
                                                    ))
                                                }
                                            </ul>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    </> : null
                }
            </Wrapper>
        </>
    );
}