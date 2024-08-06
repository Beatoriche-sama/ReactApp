import React, {useState} from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import {NativeModules} from 'react-native';
import SearchComponent from "./ui/SearchComponent";
import ReposList from "./ui/ReposList";

const {DataModule} = NativeModules;

const App = () => {
const [repos, setRepos] = useState([])

async function search(query : String){
    let json = DataModule.search(query);
    json.then((result) => {
      updateRepos(result)
    })
    .catch((error) => {
      alert(error.message);
    });
  }

function updateRepos(json){
    let result = [];
    json.forEach((element) => 
      result.push(JSON.parse(element))
    );
    setRepos(result);
}

  return (
    <>
    <SearchComponent onResponse={search}>
    </SearchComponent>
    <ReposList items={repos}>
    </ReposList>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent(
  'ReactApp',
  () => App,
);

export default App;
