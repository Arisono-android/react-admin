import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { PwaInstaller } from '../widget';
import { connectAlita } from 'redux-alita';



const FormItem = Form.Item;

class Login extends React.Component {
    componentDidMount() {
        document.title ="登录";
        const { setAlitaState } = this.props;
        setAlitaState({ stateName: 'auth', data: null });

    }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        //console.log("componentDidUpdate() nextAuth:",nextAuth);
        if(nextAuth.isFetching!=true){
                if (nextAuth!=null&&nextAuth.data!=null) {
                    if (nextAuth.data.success &&nextAuth.data.code==0) { // 判断是否登陆
                        localStorage.setItem('user', JSON.stringify(nextAuth.data));
                        history.push('/app/money/all');
                    }
                }
        }



    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                const { setAlitaState } = this.props;
                setAlitaState({funcName:'login',stateName:'auth',
                    params:{username:values.userName,password:values.password}})


            }
        });
    };
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>代理管理系统</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            {/*<span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>*/}
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                         {/*   <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span >或 现在就去注册!</span>
                                <span onClick={this.gitHub} ><Icon type="github" />(第三方登录)</span>
                            </p>*/}
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connectAlita(['auth','user_agent'])(Form.create()(Login));