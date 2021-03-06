import React from 'react';
import {Toast} from "antd-mobile";
import {get_sms_code,get_withdaw_list,get_withdraw_request_add, get_withdraw_request_list, update_withdraw_password} from "../../http";
import BreadcrumbCustom from "../BreadcrumbCustom";
import {Button, Card, Col, Row, Table, Modal, Form, Input, Icon, Select, InputNumber, message} from "antd";
import {connectAlita} from "redux-alita";
import UpdateWithDrawPasswordForm from "../forms/UpdateWithDrawPasswordForm";
import {get_thousand_num} from "../../utils/index";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const Option = Select.Option;

let limit=10;

class WithDrawRequestTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'提现记录',
            user_tel:null,
            modalVisible: false,
            modalVisibleByWithDrawPassword:false,
            selectedRowKeys: [],
            children : [],
            data: [],
            pagination: {
                showQuickJumper:true,
                showSizeChanger:true,
                onShowSizeChange:this.onShowSizeChange.bind(this),
                showTotal:(total)=>(`共 ${total} 条`),
                pageSizeOptions:[
                    '10','20','30','40','50'
                ]},
            columns:[ {
                title: 'ID',
                dataIndex: 'id',
            },{
                title: '创建时间',
                dataIndex: 'create_time',
            },{
                title: '金额',
                dataIndex: 'amount',
            },{
                title: '提现账户信息',
                dataIndex: 'withdraw_content_display',
            },{
                title: '状态',
                dataIndex: 'status_display',
            }],
        };
    }

    onShowSizeChange=(current,size)=>{
        //console.log("onShowSizeChange() current:",current,"size:",size);
        limit=size;
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

   handleChange=(value)  => {
        //console.log(`selected ${value}`);
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        const { query } = this.props;
        pager.current = pagination.current;
        this.setState({pagination: pager,});
        this.loadData({page: pagination.current-1,query:query});
    };
    componentDidMount(){
        this.loadData({page: 0});
        this.loadSelectData();
        this.props.setAlitaState({funcName:'user_info',stateName:'userData'});
    }

    loadSelectData=()=>{
        const { setAlitaState } = this.props;
        get_withdaw_list({limit: 10, offset: 0})
            .then(res => {
                setAlitaState({ stateName: 'moneyAccount', data: res.data.data });
                this.setState({
                    data: this.state.data
                })

            }).catch(err => {
            Toast.hide()
            //console.log("err:", err);
        })
    }

    loadData=(params={})=> {
        Toast.loading("")
        get_withdraw_request_list({limit: limit, offset: params.page*limit})
            .then(res => {
                const pagination = {...this.state.pagination};
                pagination.total = res.data.count;
                Toast.hide()
                this.state.data=[];
                for (let i = 0; i < res.data.data.length; i++) {
                    let model = {
                        id: res.data.data[i].id + "",
                        create_time: res.data.data[i].create_time,
                        amount: get_thousand_num(res.data.data[i].amount),
                        withdraw_content_display: res.data.data[i]. withdraw_content_display,
                        status_display: res.data.data[i].status_display,

                    }
                    this.state.data.push(model);
                }
                this.setState({
                    data: this.state.data,
                    pagination
                })

            }).catch(err => {
            Toast.hide()
            //console.log("err:", err);
        })


    }

    setModalVisible(modalVisible) {
        const { moneyAccount } = this.props;
        //console.log("setModalVisible moneyAccount:" ,moneyAccount);
        if(moneyAccount!=null){
            this.state.children=[];
            for (let i = 0; i < moneyAccount.data.length; i++) {
                this.state.children.push(<Option key={moneyAccount.data[i].id+""}>{moneyAccount.data[i].content_display}</Option>);
            }
        }
        //console.log("setModalVisible children:" ,this.state.children);
        this.setState({ modalVisible ,children:this.state.children});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log("values() money",values.money);
                //console.log("values() password",values.password);
                //console.log("values() moneyAccount",values.moneyAccount);
                this.setModalVisible(false);
                Toast.loading("");
                get_withdraw_request_add({
                    amount: values.money,
                    withdraw_account_id: values.moneyAccount.key,
                    withdraw_password:values.password})
                    .then(res=>{
                        Toast.hide();
                        this.props.setAlitaState({funcName:'user_info',stateName:'userData'});
                        //console.log("res data:", res.data);
                        this.loadData({page: 0});
                    }).catch(err=>{
                    Toast.hide();
                })
            }
        });
    };

    saveFormRefWithDrawPassword = formRef => {
        this.formRefWithDrawPassword = formRef;
    };

    setModalVisibleWithDrawPassword(modalVisibleByWithDrawPassword) {
        this.formRefWithDrawPassword.props.form.setFieldsValue({
            user_tel: this.props.userData.data.data.user_tel,
        });
        this.setState({ modalVisibleByWithDrawPassword });
    }

    onChangeInputByPhone=(e)=>{
        //console.log("onChangeInputByPhone():",e.target.value);
        this.state.user_tel=e.target.value;
        this.setState({user_tel:e.target.value})
    }

    sendMsg=()=>{
        this.formRefWithDrawPassword.props.form.validateFields((err, values) => {
              let user_tel=  values.user_tel;
              //console.log("user_tel:",user_tel);
              if(user_tel!=null&&user_tel!=""&&user_tel!=" "){
                  get_sms_code({user_tel: user_tel, auth_type: 3}).
                  then(res=>{
                      if(res.code==0){
                          message.info("短信验证码发送成功！")
                          this.child.countDown();
                      }
                      //console.log("get_sms_code result()",res.data);
                  }).catch(err=>{
                      //console.log(err)
                  })
              }
        });

    }

    onRefBindSMSCode=(ref)=>{
        this.child = ref
    }


    updateWithDrawPassword= (e) => {
        e.preventDefault();
        this.formRefWithDrawPassword.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log("tel ()",values.user_tel);
                //console.log("tel ()",values.password);
                //console.log("tel ()",values.code);
                update_withdraw_password({user_tel: values.user_tel, password: values.password,code:values.code})
                    .then(res=>{
                     //console.log("result()",res);
                        if(res.message=='success'&&res.code==0){
                            message.success("提现密码修改成功！");
                            this.setModalVisibleWithDrawPassword(false);
                        }else{
                            message.error("修改失败！"+res.data.message);
                        }
                }).catch(err=>{
                    //console.log(err)
                })
            }})
    }

    render(){
        const {  form } = this.props;
        const { getFieldDecorator } = form;
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [{
                key: 'odd',
                text: '选择奇数列',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({selectedRowKeys: newSelectedRowKeys});
                },
            }, {
                key: 'even',
                text: '选择偶数列',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({selectedRowKeys: newSelectedRowKeys});
                },
            }],
            onSelection: this.onSelection,
        };
        return <div className="gutter-example">
            <BreadcrumbCustom first="提现管理" second="提现记录"/>
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="提现记录" bordered={false}>
                            <div>
                                <Button type="primary" icon="plus" onClick={()=>{
                                     this.setModalVisible(true)
                                }
                                }>
                                   新增
                                </Button>

                                <Button type="primary"  onClick={()=>{
                                    this.setModalVisibleWithDrawPassword(true)
                                }
                                }>
                                    修改提现密码
                                </Button>
                            </div>
                            <Table rowSelection={rowSelection}
                                   className="margin_bottom_50"
                                   columns={this.state.columns}
                                   dataSource={this.state.data}
                                   pagination={this.state.pagination}
                                   onChange={this.handleTableChange}/>
                        </Card>
                    </div>
                </Col>
            </Row>

            <Modal
                title="提现请求-新增"
                centered
                visible={this.state.modalVisible}
                onOk={ this.handleSubmit}
                onCancel={() =>this.setModalVisible(false) }
            >
                <Form >
                    <FormItem label="提现金额" {...formItemLayout} >
                        {getFieldDecorator('money', {
                            rules: [{ required: true, message: '请输入提现金额!' }],
                        })(


                            <InputNumber min={1} max={1000000} defaultValue={1} onChange={()=>{}} />
                        )}
                    </FormItem>

                    <FormItem label="提现密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入提现密码!' }],
                        })(
                            <Input   type="password"  placeholder="请输入提现密码" />
                        )}
                    </FormItem>


                    <FormItem label="提现账户" {...formItemLayout}>
                        {getFieldDecorator('moneyAccount', {
                            rules: [{ required: true, message: '请输入提现账户!' }],
                        })(
                            <Select
                                labelInValue
                                style={{ width: '100%' }}
                                placeholder="请输入提现账户"
                                onChange={this.handleChange}>
                                {this.state.children}
                            </Select>,
                        )}
                    </FormItem>

                </Form>
            </Modal>


            <UpdateWithDrawPasswordForm
                wrappedComponentRef={this.saveFormRefWithDrawPassword}
                visible={this.state.modalVisibleByWithDrawPassword}
                sendMsg={this.sendMsg}
                phone={this.state.user_tel}
                onChangeInputByPhone={this.onChangeInputByPhone}
                onRefBindSMSCode={this.onRefBindSMSCode}
                onCancel={this.setModalVisibleWithDrawPassword.bind(this,false)}
                onCreate={this.updateWithDrawPassword}
            />
        </div>
    }
}

export  default connectAlita(['auth','moneyAccount',"userData"])(Form.create()(WithDrawRequestTable));