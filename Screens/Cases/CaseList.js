import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import * as firebase from 'firebase';
import {ListItem} from "../../Components/ListItem";

class CaseList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([
        { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' },
        { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' },
        { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' },
        { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' }])
    };
  }

    render() {
        return (
        <View>
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
                 />
        </View>
        );
    }

    _renderItem(clientCase) {
        return (
            <ListItem clientCase={clientCase} />
        );
    }
}


export default CaseList;
