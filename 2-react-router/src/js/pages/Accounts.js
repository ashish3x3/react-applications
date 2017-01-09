import React from "react";

import Article from "../components/Article";
import AccountsFields from "../components/AccountsFields"

var PRODUCTS = [
  {category: 'Sporting Goods', Id: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', Id: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', Id: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', Id: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', Id: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', Id: '$199.99', stocked: true, name: 'Nexus 7'}
];

export default class Accounts  extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {accounts: []};
    this.fetchAccount = this.fetchAccount.bind(this);
  }


  fetchAccount() {
    // Visualforce.remoting.Manager.invokeAction('ReactAccountController.fetchAccount', finishDataLoad(result, event){
    var vm =this;
    ReactAccountController.fetchAccount(function(result, event) {
      // console.log('result ',result)

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
    this.fetchAccount;
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
        
        <AccountsFields acc={this.state.accounts} />
        
        
      </div>
    );
  }
}



