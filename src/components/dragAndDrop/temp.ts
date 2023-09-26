//import styled from '@emotion/styled';
//import React, { ReactNode } from 'react';
//import {
//  Draggable,
//  Droppable,
//  DroppableProps,
//  DroppableProvidedProps,
//  DroppableProvided,
//  DraggableProps,
//  DraggableStateSnapshot
//} from 'react-beautiful-dnd';

////定义样式
//const Container = styled.div<{ isDragging: boolean }>`
//    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
//`;
///**
// * @author meng
// * @version 1.0
// * @date 2022/12/5
// * 封装react-beautiful-dnd,用来多次使用拖动功能，不用添加过多代码
// */
////定义类型，这里的作用是编辑children类型的作用，删除DroppableProps里的'children'换成ReactNode的children
//type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode };
////定义一个组件，作用是返回react-beautiful-dnd里面的Droppable组件，并把经过编辑的props传给它
//export const Drop = ({ children, ...props }: DropProps) => (
//  <Droppable { ...props } >
//  { provided => {
//  //isValidElement检查一个值是否是 React 元素。
//  if (React.isValidElement(children)) {
//    //cloneElement允许您使用另一个元素作为起点创建一个新的 React 元素。
//    //这里代表给克隆出来的div加上props,无论给这个组件传入的是什么元素，强制加上props
//    return React.cloneElement(children, {
//      //这些都是eact-beautiful-dnd里面的Droppable组件自带的props
//      ...provided.droppableProps,
//      ref: provided.innerRef,
//      provided
//    });
//  }
//  return <div />;
//}}
//</Droppable>
//);
////定义给组件返回的props类型，React.HTMLAttributes<HTMLDivElement>;代表可以给组件传入普通的elment属性，例如style
//type DropChildProps = Partial<
//  { provided: DroppableProvided } & { snapshot: DraggableStateSnapshot } & DroppableProvidedProps
//> &
//  React.HTMLAttributes<HTMLDivElement>;
////forwardRef让您的组件通过 ref 向父组件公开 DOM 节点
////如果需要自定义组件使用ref，就要用React.forwardRef来转发ref
////HTMLDivElement代表返回的div这种html标签类型
////这个组件是给上面 Drop组件做childen的
//// eslint-disable-next-line react/display-name
//export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
//  ({ children, ...props }, ref) => (
//    <Container
//            ref= { ref }
//            isDragging = { props.snapshot?.isDragging as boolean }
//            { ...props }
//  >
//  { children }
//            { props.provided?.placeholder }
//  < /Container>
//)
//);
////定义类型，这里的作用是编辑children类型的作用，删除DraggableProps里的'children'换成ReactNode的children
//type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode };
//export const Drag = ({ children, ...props }: DragProps) => (
//  <Draggable { ...props } >
//  {(provided, snapshot) => {
//  if (React.isValidElement(children)) {
//    return React.cloneElement(children, {
//      ...provided.draggableProps,
//      ...provided.dragHandleProps,
//      ref: provided.innerRef,
//      isDragging: snapshot.isDragging
//    });
//  }
//  return <div />;
//}}
//</Draggable>
//);
