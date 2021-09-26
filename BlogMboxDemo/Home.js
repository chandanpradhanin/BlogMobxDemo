import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';

@inject('todoStore')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  componentWillMount() {
    const { todoStore } = this.props
    todoStore.getData();
  }
  onChangeText = (text) => {
    if (text && !!text) {
      this.setState({ text })
    }
  }
  SubmitData = () => {
    try {
      const { text } = this.state
      if (text && !!text) {
        this.setState({ text: '' })
        const { todoStore } = this.props
        todoStore.addTodo(text)
      } else {
        alert('Please enter todo title!')
      }
    } catch (error) {
      alert('Something went wrong')
    }
  }
  markTodo = (index) => {
    const { todoStore } = this.props
    todoStore.checkTodo(todoStore.todos[index])
  }

  deleteTodo = (index) => {
    const { todoStore } = this.props
    todoStore.deleteTodo(index)
  }

  render() {
    const { todos, todosCompletedCount } = this.props.todoStore
    const { text } = this.state
    return (
      <SafeAreaView style={styles.SafeAreaViewcontainer}>

        <View style={{ margin: 10, marginTop: 50 }}>
          <TextInput
            style={styles.textInput}
            value={text}
            placeholder={'Add Todo'}
            onChangeText={this.onChangeText}
          />

          <View style={styles.buttonrow}>
            <Button
              title="Submit"
              containerStyle={styles.buttonsubmit}
              onPress={this.SubmitData}
            />
          </View>

          {todos.length > 0 &&
            <>
              <View>
                <Text style={styles.todomaintitle}>My Todos</Text>
              </View>
              {todos.map((data, index) => {
                return (

                  <View style={styles.swipeContentContainerStyle}>
                    <Text>{data.title}</Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        disabled={data.completed}
                        onPress={() => { this.markTodo(index) }}
                        style={[styles.buttonStyle, { backgroundColor: 'green' }]}>
                        <Text style={{ color: 'white' }}>{data.completed ? "It's Completed" : 'Complete It!'}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => { this.deleteTodo(index) }}
                        style={[styles.buttonStyle, { backgroundColor: 'red' }]}>
                        <Text style={{ color: 'white' }}>{'Delete'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}
            </>
          }
          <View style={styles.buttonrow}>
            <Text style={styles.todomaintitle}>CompletedCount({todosCompletedCount})</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  SafeAreaViewcontainer: {
    flex: 1,
    width: '100%'
  },
  textInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 5
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 55,
    marginTop: 10,
    backgroundColor: 'white',
  },
  swipcercell: {
    alignSelf: 'center',
    aspectRatio: 1,
    flexDirection: 'column',
    padding: 10,
  },
  swipeContentContainerStyle: {
    borderRadius: 10,
    paddingHorizontal: 5,
    borderColor: 'gray',
    borderWidth: 1,
    // Width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10

  },
  listiem: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderRadius: 10,
    width: '98%',
    paddingLeft: 10
  },
  buttonsubmit: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonrow: {
    flexDirection: 'row'
  },
  todomaintitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  buttonContainer: {
    width: '40%',
    height: 48
  },
  buttonStyle: {
    width: '100%',
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  }
});