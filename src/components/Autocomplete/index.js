import React, { useState, useContext, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';
import ListContext from '../../contexts/SearchMovies';
import { getMovies } from '../../api/index';
import Swal from 'sweetalert2';

import { colorDanger } from '../../color';
import { Ul, Li, SuggestContainer } from './style';
import { Button, Input, borderRadiusLeft, borderRadiusRight, positionRelative, Row, Col, pr0, pl0 } from '../../styles';

const PAGE = 1;

export default function Autocomplete() {
    const { searchMovies, setSearchMovies } = useContext(ListContext);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [stateOpen, setStateOpen] = useState(false);
    const node = useRef();

    useEffect(() => {
        setInputValue(searchMovies.name);
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const debouncedOptions = debounce((newValue) => getOptions(newValue), 2000);

    const handleClick = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setStateOpen(false);
    };

    const updateValue = (newValue) => {
        setLoading(true);
        setInputValue(newValue);
        if (newValue === '') {
            setOptions([]);
            setLoading(false);
        } else {
            debouncedOptions(newValue);
        }
    };

    const getOptions = async (value) => {
        const param = {
            searchValue: value,
            page: PAGE
        };
        setLoading(true);
        await getMovies(param).then((res) => {
            if (res.Response === 'True') {
                setOptions(res.Search);
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }

    const selectSuggestion = (value) => {
        setStateOpen(false);
        setInputValue(value);
        setSearchMovies({
            name: value,
            isSearch: true
        })
    }

    const search = () => {
        inputValue ? 
        setSearchMovies({
            name: inputValue,
            isSearch: true
        }) :
        Swal.fire({
            title: "Fail !!!",
            text: "Can't search with 'Empty' value.",
            icon: "error",
            confirmButtonColor: colorDanger
        });
    }
    
    const getStateInput = (value) => {
        if (value === 'focus') {
            setStateOpen(true)
        }
    };

    return (
        <>
            <Row>
                <Col
                    xs="8"
                    sm="8"
                    md="5"
                    className={`${borderRadiusLeft} ${pr0}`}
                >
                    <div
                        ref={node}
                        className={`${positionRelative}`}
                    >
                        <Input
                            value={inputValue}
                            onChange={(input) => updateValue(input.target.value)}
                            onFocus={() => getStateInput('focus')}
                            onBlur={() => getStateInput('blur')}
                            className={`${borderRadiusLeft}`}
                            placeholder="Search Movie by Name"
                        />
                        {
                            stateOpen ?
                                <SuggestContainer>
                                    <Ul>
                                        {loading && <Li>Loading...</Li>}
                                        {options?.length > 0 && !loading && options?.map((item, index) => (
                                            <Li
                                                key={index}
                                                onClick={() => selectSuggestion(item.Title)}
                                            >
                                                {item.Title}
                                            </Li>
                                        ))}
                                    </Ul>
                                </SuggestContainer> : null
                        }
                    </div>
                </Col>
                <Col
                    xs="4"
                    sm="4"
                    md="2"
                    className={`${borderRadiusLeft} ${pl0}`}
                >
                    <Button
                        className={`${borderRadiusRight}`}
                        onClick={() => search()}
                    >
                        Search
                    </Button>
                </Col>
            </Row>
        </>
    );
}