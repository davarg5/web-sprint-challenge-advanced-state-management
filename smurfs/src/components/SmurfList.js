import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchSmurfs, addSmurf } from './../actions';

import styled from 'styled-components';

const Container = styled.div`
    width: 80%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 5px;
    box-shadow: 0 1px 6px -2px #000;
    background-color: lightgray;
    margin-bottom: 30px;
    margin: auto;
    margin-top: 5%;
    align-items: center;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SmurfList = props => {

    const newSmurf = {
        name: '',
        age: '',
        height: ''
    }

    const [smurfy, setSmurfy] = useState(newSmurf);

    useEffect(() => {
        props.fetchSmurfs();
    }, [])

    const handleChange = e => {
        setSmurfy({...smurfy,
            [e.target.name]: e.target.value
        })
    }

    const handleAdd = e => {
        e.preventDefault();
        props.addSmurf(smurfy);
        setSmurfy({...smurfy,
            name: '',
            age: '',
            height: ''
        })
    }
    return(
        <div>
            <h2>Smurfs</h2>
            {props.isLoading ? <p>Loading Smurf data...</p> : null}
            {props.errorMessage ? <p>{props.errorMessage}</p> : null}
            {props.smurfsData.map(smurf => {
                return (
                    <Container>
                        <div>Name: {smurf.name}</div>
                        <div>Age: {smurf.age}</div>
                        <div>Height: {smurf.height}</div>
                    </Container>
                )
            })}

            <h3>Add a Smurf:</h3>
            <form onSubmit={handleAdd}>
            <InputContainer>
                <label>
                    Name
                    <input
                    name='name'
                    type='text'
                    value={smurfy.name}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Age
                    <input
                    name='age'
                    type='text'
                    value={smurfy.age}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Height
                    <input
                    name='height'
                    type='text'
                    value={smurfy.height}
                    onChange={handleChange}
                    />
                </label>
                <button>Add!</button>
                </InputContainer>
            </form>
        </div>


    )

}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        smurfsData: state.smurfsData,
        errorMessage: state.errorMessage
    }
}

export default connect(mapStateToProps, { fetchSmurfs, addSmurf })(SmurfList);