import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClientSKU } from '../../redux/features/client/clientSlice'
import { getTaskbyClientSku } from '../../redux/features/task/TaskSlice'
import Card from '../../components/card/Card'
import styles from "./Home.scss"

const Home = () => {
    const [sku, setSKU] = useState("")
    const dispatch = useDispatch()
    const { client, isError: clientError, isSuccess: clientSuccess, message: clientMessage } = useSelector((state) => state.client)
    const { tasks, isError: taskError, isSuccess: taskSuccess, message: taskMessage } = useSelector((state) => state.task)

    const onSubmit = (e) => {
        e.preventDefault();
        if (sku) {
            console.log(`Dispatching getClientSKU with SKU: ${sku}`);
            dispatch(getClientSKU(sku))
            dispatch(getTaskbyClientSku(sku))
            
        }
    }

    useEffect(() => {
        if (clientSuccess) {
            console.log("Client data fetched successfully:", client);
        }
        if (clientError) {
            console.log("Error fetching client data:", clientMessage);
        }
    }, [clientSuccess, clientError, client, clientMessage]);

    useEffect(()=>{
        if (taskSuccess){
            console.log("Task data fetched successfully:", tasks);
        }
        if (taskError){
            console.log("Error fetching task data:", taskMessage);
        }
    }, [taskSuccess, taskError, tasks, taskMessage])

    const getProgressStatus = (progress) =>{
        switch(progress){
          case '1':
            return 'Not Started';
            case '2':
            return 'To Do';
            case '3':
            return 'Doing';
            case '4':
            return 'Done';
        }
      }

      const obfuscateName = (name) => {
        if (!name.includes(' ')) {
            return name.charAt(0) + '*'.repeat(name.length - 1);
        }
    
        const nameParts = name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        const obfuscatedPart = '*'.repeat(firstName.length - 2);
        return firstName.charAt(0) + obfuscatedPart + lastName;
    };
    

    const obfuscatePhone = (str) => {
        if (str.length <= 4) {
            return str;
        }
        const start = str.slice(0, 2);
        const end = str.slice(-2);
        const middle = '*'.repeat(str.length - 4);
        return start + middle + end;
    };

    const obfuscatePrice = (str) => {
        if (str.length <= 6) {
            return str;
        }
        const end = str.slice(-6);
        const start = '*'.repeat(str.length - 6);
        return start + end ;
    };

    return (
        <div className='home --flex-center'>
            <img 
            
            src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/399672144_840049541012850_8330469818205748567_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH-usbAnBapvl-TUrNsaX9Iyc7_cBMfnZDJzv9wEx-dkEyBpOrEIZ9dfpGmX2RVpaYyvZq8qQjlcl-zw7ebInkH&_nc_ohc=F42ZLsYcJ0MQ7kNvgH0w-d7&_nc_ht=scontent.fdad1-4.fna&oh=00_AYBqiAQsOs3HoxmrNF7BTT_nheOnbiv4bjA0xskKkx93eA&oe=66819704" alt="" />
            <Card>
                <div className={styles.form}>
            <form onSubmit={onSubmit}>
                <h2>Find client ID</h2>
                <div className="d-flex">
                <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSKU(e.target.value)}
                    placeholder="Enter client ID"
                />
                <button className='--btn --btn-primary' type="submit">Search</button>
                </div>
            </form>
<div className='detail p-3'>
{client && client.length === 0  && (<p>--No client found, please try again--</p>)}
{client && client.length > 0 &&  (
                <div className="detail">
                    <h4>Client Details</h4>
                    <div><b>Name: </b>{obfuscateName(client[0].name)}</div>
                    <div>
                    <b>Phone: </b>{obfuscatePhone(client[0].phone)}
                    </div>
                    
                </div>
            )}
<hr/>

            {tasks && tasks.length > 0 && (
                <div className={styles.table}>
                    <h4>Task List</h4>
                    <table style={{width:"100%"}}>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Name</th>
                                <th>Progress</th>
                                <th>Price</th>
                                <th>Created at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => {
                                const { _id, name, progress, price, createdAt } = task
                                return (
                                    <tr key={_id}>
                                        <td>{index + 1}</td>
                                        <td>{name}</td>
                                        <td>{getProgressStatus(progress)}</td>
                                        <td>{obfuscatePrice(price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))}</td>
                                        <td>{new Date(task.createdAt).toLocaleDateString("vi-VN")}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
</div>

            
            </div>
            </Card>
        </div>
    )
}

export default Home
