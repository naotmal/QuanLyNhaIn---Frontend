import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/features/task/TaskSlice';
import LineChartComponent from '../../components/chart/LineChartComponent';
import PieChartComponent from '../../components/chart/PieChartComponent';
import { format, subDays, parseISO } from 'date-fns';
import Card from '../../components/card/Card';
import './Statistic.scss';
import { getMaterials } from '../../redux/features/material/materialSlice';
import BarChartComponent from '../../components/chart/BarChartComponent';
import { getReceipts } from '../../redux/features/receipt/receiptSlice';
import { getDeliveries } from '../../redux/features/delivery/deliverySlice';

const Statistic = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading: taskLoading, isError: taskError, message: taskMessage } = useSelector((state) => state.task);
  const { materials, isLoading: materialLoading, isError: materialError, message: materialMessage } = useSelector((state) => state.material);
  const { receipts, isLoading: receiptLoading, isError: receiptError, message: receiptMessage } = useSelector((state) => state.receipt);
  const { deliveries, isLoading: deliveryLoading, isError: deliveryError, message: deliveryMessage } = useSelector((state) => state.delivery);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getMaterials());
    dispatch(getReceipts());
    dispatch(getDeliveries());
  }, [dispatch]);

  // Generate list of last 30 days
  const generateLast30Days = () => {
    const result = [];
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      result.push(format(subDays(now, i), 'yyyy-MM-dd'));
    }
    return result.reverse(); // Reverse to have oldest date first
  };

  // Transform tasks data for line chart (tasks created)
  const transformedTaskData = tasks.reduce((acc, task) => {
    const date = format(parseISO(task.createAt), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  

  // Prepare data for line chart (tasks created)
  const lineChartData = useMemo(() => {
    const last30Days = generateLast30Days();
    return last30Days.map(date => ({
      name: format(parseISO(date), 'dd'),
      tasks: transformedTaskData[date] || 0,
    }));
  }, [tasks]);

  // Transform materials data for pie chart (material availability)
  const pieChartMaterial = useMemo(() => {
    const quantityCount = materials.reduce((acc, material) => {
      const quantity = material.quantity;
      if (quantity <= 0) {
        acc['Out Of Stock'] = (acc['Out Of Stock'] || 0) + 1;
      } else if (quantity <= 20 && quantity > 0) {
        acc['Need Restock'] = (acc['Need Restock'] || 0) + 1;
      } else {
        acc['Available'] = (acc['Available'] || 0) + 1;
      }
      return acc;
    }, {});

    return [
      { name: 'Out Of Stock', value: quantityCount['Out Of Stock'] || 0 },
      { name: 'Need Restock', value: quantityCount['Need Restock'] || 0 },
      { name: 'Available', value: quantityCount['Available'] || 0 },
    ];
  }, [materials]);

  // Prepare data for task progress pie chart
  const pieChartData = useMemo(() => {
    const progressLabels = {
      '1': 'Not Started',
      '2': 'To Do',
      '3': 'Doing',
      '4': 'Done',
    };
  
    const filteredTasks = tasks.filter(task => task.progress !== 4);
    console.log('Filtered Tasks:', filteredTasks); // Debugging: Check the filtered tasks

    const progressCount = filteredTasks.reduce((acc, task) => {
      const progress = task.progress.toString(); // Convert to string if necessary
      if (!acc[progress]) {
        acc[progress] = 0;
      }
      acc[progress] += 1;
      return acc;
    }, {});
    console.log(progressCount);
    return Object.keys(progressCount).map(progress => ({
      name: progressLabels[progress] || progress, // Use label if exists, else use progress value
      value: progressCount[progress],
    }));
  }, [tasks]);

  // Prepare data for receipt quantities
  const receiptData = useMemo(() => {
    return receipts.map(receipt => ({
      name: format(parseISO(receipt.createAt), 'dd'),
      receiptQuantity: receipt.quantity,
    }));
  }, [receipts]);

  // Prepare data for delivery quantities
  const deliveryData = useMemo(() => {
    return deliveries.map(delivery => ({
      name: format(parseISO(delivery.createAt), 'dd'),
      deliveryQuantity: delivery.quantity,
    }));
  }, [deliveries]);

  // Combine receipt and delivery data by date
  const combinedChartData = useMemo(() => {
    const receiptMap = receiptData.reduce((acc, item) => {
      acc[item.name] = { ...acc[item.name], receiptQuantity: item.receiptQuantity || 0 };
      return acc;
    }, {});

    deliveryData.forEach(item => {
      if (receiptMap[item.name]) {
        receiptMap[item.name].deliveryQuantity = item.deliveryQuantity || 0;
      } else {
        receiptMap[item.name] = { name: item.name, deliveryQuantity: item.deliveryQuantity || 0 };
      }
    });

    return Object.values(receiptMap);
  }, [receiptData, deliveryData]);

  if (taskLoading || materialLoading || receiptLoading || deliveryLoading) {
    return <p>Loading...</p>;
  }

  if (taskError || materialError || receiptError || deliveryError) {
    return <p>Error: {taskError ? taskMessage : (materialError ? materialMessage : (receiptError ? receiptMessage : deliveryMessage))}</p>;
  }

  return (
    <div className='statistic'>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-8">
            <Card cardClass={"chart-box"}>
              <h3>Tasks Created This Month</h3>
              <LineChartComponent data={lineChartData} />
            </Card>
          </div>
          <div className="col-4">
            <Card cardClass={"chart-box"}>
              <h3>Task Progress</h3>
              <PieChartComponent data={pieChartData} />
            </Card>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <Card cardClass={"chart-box"}>
              <h3>Material Availability</h3>
              <PieChartComponent data={pieChartMaterial} />
            </Card>
          </div>
          <div className="col-8">
            <Card cardClass={"chart-box"}>
              <h3>Material Quantity</h3>
              <BarChartComponent data={combinedChartData} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
