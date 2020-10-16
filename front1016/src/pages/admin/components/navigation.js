import React, { Component } from 'react';
import '../useAntd.css'
import '../style.css';
import { Menu, Button } from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreator } from "../store";
// import {Link} from 'react-router-dom'; 
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

class navigation extends Component {
  //   state = {
  //   collapsed: false,
  // };

  // toggleCollapsed = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };

    render() {
        return (
            <div>
            {/* <Button className="mt-4" type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button> */}
            <Menu
              className="adminNav"
              // defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              mode="inline"
              theme="light"
              // inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />} onClick={this.handleOption1Click}>
                Adjust WebOn Stock Condition
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />} onClick={this.handleOption2Click}>
                Upload Mydeal CSV
              </Menu.Item>
              {/* <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
              </Menu.Item> */}
              <SubMenu key="sub1" icon={<MailOutlined />} title="Kogan">
                <Menu.Item key="5" onClick={this.handleOption3Click} disabled>Fetch Kogan New Order</Menu.Item>
                <Menu.Item key="6" onClick={this.handleOption4Click}>Send Tracking info to Kogan</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </div>
        );
    }
    handleOption1Click =()=>{
      this.props.handleOption1Click()
    }
    handleOption2Click =()=>{
      this.props.handleOption2Click()
    }
    handleOption3Click =()=>{
      this.props.FetchNewOrderAction()
      this.props.handleOption3Click()
    }
    handleOption4Click = ()=>{
      this.props.handleOption4Click()
    }
}
const mapStateToProps = state=>{
  return {

  }
}
const mapDispatchToProps = dispatch=>{
  return {
    FetchNewOrderAction:bindActionCreators(actionCreator.FetchNewOrderAction,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(navigation);