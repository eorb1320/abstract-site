
/*
class Site{} 상태로 클래스가 만들어져 있어도 index.spec.js에서 객체 선언해도 상관없음 에러는 안남
하지만 객체를 생성할때 어떠한 파라미터을 넘겨도 Site {} 상태로 만들어짐
그래서 특정한 값들로 객체를 구성해주는 constructor(){} 생성
객체를 구성하는 값을 세팅해주는 함수(정확한 개념은 다시한번 찾아봐야할듯)
//
*/
const boardList = [];
const articleList =[];
class Site {
    constructor() {  
        this.boards = []; 
    }

    /*
        Class Site 객체가 생성될때 만들어진 this.boards 라는 배열에
        파라미터로 넘어온 board를 push 해주는 함수
    */
    addBoard(board) {
        /**
        find 함수 : 배열에 입력한 조건에 해당하는 행을 반환
        this.boards 에 담겨 있는 데이터의 boardName을 체크 해서 
        넘어온 board 의 boardName과 일치하는 데이터가 존재하면 throw true 에러를 반환
        존재하지 않는다면 this.board에 넘어온 board를 push
        */
        const findBoard = this.boards.find(item => item.boardName === board.boardName);

        // for(var i = 0; i<this.boards.length;i++){
        //     var item = this.boards[i];
        //     if(item.boardName == board.boardName){
        //         return item;
        //     }
        // }

        if(findBoard==undefined){
            this.boards.push(board);
            boardList.push(board);
        }else{
            throw true;
        }
    }
    /**
     addBoard(board) 함수를 통하여 this.boards 배열에 push되어진
     board 내용들 중에 boardName이 일치하는 board를 반환
     */
    findBoardByName(boardName){
        //addBoard() 함수에서 사용된 find 함수를 이용하여 일치하는 boardName을 찾아서 반환
        const findBoard = this.boards.find(item => item.boardName === boardName);
        return findBoard;
    }

}

class Board {
    constructor(boardName){
        if(emptyCheck(boardName)){
            this.boardName = boardName; 
            this.article=[];           
        }else{
            throw true;
        }
    }
    publish(article){
        const findBoard = boardList.find(item => item.boardName === this.boardName);
        if(findBoard!=undefined){
            this.article.push(article);
            articleList.push(article);
        }else{
            throw true;
        }
        
    }
    getAllArticles(){
        return this.article;
    }
} 

class Article {
    constructor(boardData){
        if(!emptyCheck(boardData.subject) || !emptyCheck(boardData.subject) || !emptyCheck(boardData.subject)){
            throw true;
        }else{
            this.id = boardList[boardList.length-1].boardName+'-'+(articleList.length+1);
            this.boardData = boardData;
            this.createdDate = new Date().toISOString();
            this.comment=[];
        }
    }
    reply(commentData){  
        const findArticle = articleList.find(item => item.id === this.id);
        if(findArticle!=undefined){
            this.comment.push(commentData);
        }else{
            throw true;
        }
    }
    getAllComments(){
        return  this.comment;
    }
}

class Comment {
    constructor(commentData){
        if(!emptyCheck(commentData.content) || !emptyCheck(commentData.author)){
            throw true;
        }else{
            this.content = commentData.content;
            this.author  = commentData.author;
            this.createdDate = new Date().toISOString();
        }

    }
}


//공백,null,undefined  체크 함수
function emptyCheck(data){
    if(data == undefined || data ==null || data==""){
        return false;
    }else{
        return true;
    }
}
module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
