export function add(left:string, right:string) {
     return parseInt(left)+parseInt(right);
}

export function subtract(left:number, right:number){
     return left-right;
}

export function test(){
     console.log("print test");
}

export function validateField(input:any){
     return !isNaN(input);
}