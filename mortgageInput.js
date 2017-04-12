import React from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';

export default class MortgageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: '',
      principal: 0,
      years: 0,
      response: '',
      completed: false
    }
    this.calculate = this.calculate.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      rate: '',
      principal: 0,
      years: 0,
      response: '',
      completed: false
    })
  }

  calculate() {
    function getMonths(yrs) {
    return yrs * 12
    }

    function convertRate(rate) {
      return Number(rate);
    }

    function MonthlyPayments(r, p, yrs) {
      months = getMonths(yrs)
      rate = convertRate(r)
      this.values = function() {
        return {months: months, rate: rate, principal: p}
      }
      this.total = function() {
        firstTop = rate * Math.pow((1 + rate), months);
        secondBottom = Math.pow(1 + rate, months) - 1;
        return Math.round(p * (firstTop / secondBottom));
      }
      this.message = function() {
        return `At a rate of ${rate} percent with ${months} months of payments and a principal of ${p}, your monthly mortgage payment will be $${this.total()} per month`
      }
    }
    const mortgage = new MonthlyPayments(this.state.rate, this.state.principal, this.state.years);
    this.setState({
      response: mortgage.message(),
      completed: true
    })
  }

  render() {
    console.log(this.state.completed, this.state.response)
    return (
      <View style={styles.container}>
        {
          this.state.completed ?
            <Text>{this.state.response}</Text>
            : null
        }
        <Text>Rate</Text>
        <TextInput
          style={{height: 40, backgroundColor: 'pink'}}
          value={this.state.rate}
          onChangeText={(text) => this.setState({rate: text})}
        />
        <Text>Principal</Text>
        <TextInput
          style={{height: 40, backgroundColor: 'pink'}}
          value={this.state.principal}
          onChangeText={(text) => this.setState({principal: text})}
        />
        <Text>Years</Text>
        <TextInput
          style={{height: 40, backgroundColor: 'pink'}}
          value={this.state.years}
          onChangeText={(text) => this.setState({years: text})}
        />
        <Button
          onPress={this.calculate}
          title="Calculate"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.reset}
          title="Reset"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 100
  },
});
