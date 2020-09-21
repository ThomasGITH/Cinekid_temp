function createMachine(stateMachineDefinition){
    const machine = {
        value: stateMachineDefinition.initialState,

        transition(currentState, event) {
            const currentStateDefinition = stateMachineDefinition[currentState]
            const destinationTransition = currentStateDefinition.transitions[event]
            if (!destinationTransition){
                return
            }
        const destinationState = destinationTransition.target
        const destinationStateDefinition = 
        stateMachineDefinition[destinationState]
       
    destinationTransition.action()
    currentStateDefinition.actions.onExit()
    destinationStateDefinition.actions.onEnter()

        machine.value = destinationState

        return machine.value
    },  
   }
return machine
}

const machine = createMachine({
    initialState: 'spawn',
        spawn:{
            actions:{
                onEnter(){
                    console.log("spawn: onEnter")
                },
                onExit(){
                    console.log("spawn: onExit")
                },
            },
            transitions: {
                start: {
                    target: 'idle',
                action(){
                    console.log("transition from 'spawn' to 'idle'")
                },
            },
          },
        },
        idle:{
            actions:{
                onEnter(){
                    console.log("idle: onEnter")
                },
                onExit(){
                    console.log("idle: onExit")
                },
            },
            transitions: {
                move: {
                    target: 'walk',
                action(){
                console.log("transition from 'idle' to 'walk'")
            },
        },
      },
    },
        
        walk:{
            actions:{
                onEnter(){
                    console.log("walk: onEnter")
                },
                onExit(){
                    console.log("walk: onExit")
                },
            },
            transitions: {
                stop:{
                    target: "idle",
                
                action() {
                console.log("transition from 'walk' to 'idle'")
            },
        },
      },
    },
 })

 let state = machine.value

 console.log(`current state: ${state}`)
 state = machine.transition(state, `start`)
 console.log(`current state: ${state}`)
 state = machine.transition(state, `move`)
 console.log(`current state: ${state}`)
 state = machine.transition(state, `stop`)
 console.log(`current state: ${state}`)