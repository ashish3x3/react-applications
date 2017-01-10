import React from "react";

import Article from "../components/Article";
import AccountsFields from "../components/AccountsFields"
import Search from "../components/Search"

export default class Accounts  extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = ({accounts: [],filterText:'',hideId:false});
    this.fetchAccount = this.fetchAccount.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filterText,hideId) {
    this.setState({
      filterText: filterText,
      hideId:hideId
    });
  }


  fetchAccount() {
    // Visualforce.remoting.Manager.invokeAction('ReactAccountController.fetchAccount', finishDataLoad(result, event){
    var vm =this;
    // alert('called fetchAccount');
    ReactAccountController.fetchAccount(function(result, event) {
      console.log('result ',result)

      // var result = result.map(function(result,index) {
      //       return <AccountsFields key={index} user={ result } />
      // });

      // var applications    = JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'));
      vm.setState({accounts:JSON.parse(result.replace(/&/g,'').replace(/quot;/g,'"'))});

    },{escape:false});
        
    // });
    // this.setState({accounts:'set manually'});
  }

  componentDidMount() {
    // alert('components did mount')
    this.fetchAccount();
    // this.timerID = setInterval(
    //   () => this.fetchAccount(),
    //   1000
    // );
    // this.fetchAccount();
  }

  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  render() {
    
    // acc = { this.state.accounts };
    // alert(acc);
    var acc1 = this.state.accounts;
    console.log('typeof acc1 ',typeof acc1 )
    console.log('typeof PRODUCTS ',typeof PRODUCTS )
    // alert('typeof acc1 ',typeof acc1,'....',typeof this.state.accounts);
    // var acc2 = acc1.forEach(function(data) {
    //   console.log('data in fun ',data)
    //      return ( {data});
    //     });
    return ( 
      <div>
        <h1>Accounts</h1>
        <Search filterText={this.state.filterText} hideId={this.state.hideId} onUserInput={this.handleUserInput}  />
        <AccountsFields acc={this.state.accounts} filterText={this.state.filterText} hideId={this.state.hideId}/>
        
        
      </div>
    );
  }
}



