const ConfusingGlobals = require('confusing-browser-globals');
const { Site, Board, Article, Comment } = require('.');


describe('Site 요구사항 테스트', () => {

    //Site 라는 객체가 생성되는지 테스트
    //1. index.spec.js 1line  - const { Site, Board, Article, Comment } = require('.');
    //2. index.js 9  line - Class Site {} 선언
    //3. index.js         - module.exports= {Site} 선언
    /* 위 3개 정상적으로 선언되어져서  
    test('TEST문구' , ()=> {
        //위치에서 const 변수이름 = new Site(); 객체가 선언되어도 에러가 나지 않는지 테스트
    })
    */
   //1번 
    test('Site는 n개 이상 생성 할 수 있다.', () => {
        expect(() => {
        // Site 객체 생성
        // Class Site
        /*
            constructor 에
            this.boards = []; 라고 선언되어져 있기 때문에
            //결과
            const _site1 = Site {boards:[]} ;
            const _site2 = Site {boards:[]} ;
            상태로 생성되며
            정상적으로 생성이 되었기 때문에 에러가(throw) 가 발생하지 않으며
            test는 정상적으로 pass
        */
            const _site1 = new Site();
            const _site2 = new Site();
        }).not.toThrow();
    });
    
    //2번
    test('Site에는 Board를 추가하고 추가된 Board를 조회할 수 있다.', () => {
        
        // Site 객체 생성
        // Class Site
        /*
            mySite = Site {boards :[]} ;
        */
        const mySite = new Site(); 
        /*
            Class Board 

            constructor에는 this.boardName = boardName; 이라고 선언되어져 있기 때문에
            매개변수(파라미터)로 넘어온 '공지사항' 의 값이
            this.boardName = '공지사항'

            const noticeBoard = Board { boardName: '공지사항' }

            //const noticeBoard = new Board('공지사항',1,2);
            //const noticeBoard = Board { boardName: '공지사항' , boardNum:1 , userNum:2 }
            형태로 객체가 생성됨
        */
        const noticeBoard = new Board('공지사항');

        /*
            위에서 new Site() 를 통해서 만들어진 객체의 함수를 호출가능
            index.js 14 line - addBoard(board){}

            const noticeBoard = Board { boardName: '공지사항' }형태로 생성된 객체
            noticeBoard를 mySite.addBoard() 에 파라미터로 넘김

            mySite = Site {boards :[{ boardName: '공지사항' }]} ;
            형태로 담김
        */
       // mySite = Site {boards :[]} ;
        mySite.addBoard(noticeBoard);
        // mySite = Site {boards :[{ boardName: '공지사항' }]} ;

        //findBoardByName 함수를 이요해 boardName이 '공지사항' 일치하는 board를 찾아서 
        //noticeBoard 와 일치하는지 확인 
        //원하는 객체와 일치하는 객체가 존재하는지 확인후 패스

        //mySite.findBoardByName('공지사항') = { boardName: '공지사항' }
        //비교할 데이터 noticeBoard =  { boardName: '공지사항' }
        expect(mySite.findBoardByName('공지사항')).toEqual(noticeBoard);
    });

    //3번
    test('하나의 Site에 동일한 이름의 Board를 추가할 수 없다.', () => {
        const mySite = new Site();
        //const noticeBoard1 = Board { boardName: '공지사항' }
        const noticeBoard1 = new Board('공지사항');
        //const noticeBoard2 = Board { boardName: '공지사항' }
        const noticeBoard2 = new Board('공지사항');

        // mySite = Site {boards :[]} ;
        mySite.addBoard(noticeBoard1); 
        // mySite = Site {boards :[{ boardName: '공지사항' }]} ;

        expect(() => {
            mySite.addBoard(noticeBoard2);
        }).toThrow();
    });

    //4번 
    test('Board는 n개 이상 추가 할 수 있다.', () => {
        // mySite = Site {boards :[]} ;
        const mySite = new Site();
        //const noticeBoard = Board { boardName: '공지사항' }
        const noticeBoard = new Board('공지사항');
        //const faqBoard = Board { boardName: 'FAQ' }
        const faqBoard = new Board('FAQ');

        expect(() => {
            // mySite = Site {boards :[]} ;
            mySite.addBoard(noticeBoard);
            // mySite = Site {boards :[{ boardName: '공지사항' }]} ;
            mySite.addBoard(faqBoard);
            // mySite = Site {boards :[{ boardName: '공지사항' }, { boardName: 'FAQ' }]} ;
        }).not.toThrow();
        //mySite.boards = [{ boardName: '공지사항' }, { boardName: 'FAQ' }]
        //[{ boardName: '공지사항' },  { boardName: 'FAQ' }]
        expect(mySite.boards).toEqual([noticeBoard, faqBoard]);
    });
});


//Borad에 Article 생성테스트
describe('Board 요구사항 테스트', () => {
    /*
        describe('Board 요구사항 테스트', () => {
            test() 에 속하지 않고 전역 변수로 let mySite 선언
        });
    */
    /**
     * @type {Site}
     */

    let mySite;
    
    //전역 변수 객체 선언
    //아래 테스트 진행 하며 초기화 되지 않고 계속 사용됨
    beforeEach(() => {
        // NOTE: Reset `mySite`
        mySite = new Site();
    });
    //5번
    test('Board는 name 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다.', () => {
        expect(() => {
             //const _board = Board { boardName: '공지사항' }
             //공지사항이라는 값이 존재 하기때문에 객체 생성 성공
            const _board = new Board('공지사항');
        }).not.toThrow();
        // 기존에 
            /*
                constructor(boardName){
                    this.boardName = boardName; 
                }
                Class Board 에 공백,null 체크를 하지 않은 상태에서
                '' , null 값을 boardName으로 넘겨도 문제는 안됨
                하지만 공백,null로는 객체 생성을 막기 위해 
                constructor 부분을 아래 와 같이수정

                constructor(boardName){
                    if(boardName!=="" && boardName!==null){
                        this.boardName = boardName; 
                        this.article=[];           
                    }else{
                        throw true;
                    }
                }
            */
        expect(() => {
            const _board = new Board('');
        }).toThrow();

        expect(() => {
            const _board = new Board(null);
        }).toThrow();
        //constructor 수정후 '' , null 값이 넘어가면
            // throw true; 가 return 되며 pass
    });
    //6번
    test('Site 에 추가된 Board만 사용 가능한 것으로 간주하며 사용 불가능한 Board에는 Article을 추가할 수 없다.', () => {
        const addedBoard = new Board('사이트에 추가된 게시판');
        const notAddedBoard = new Board('사이트에 추가되지 않은 게시판');
        
        mySite.addBoard(addedBoard);

        expect(() => {
            const article = new Article({
                subject: '글 제목',
                content: '내용',
                author: '작성자',
            });
            addedBoard.publish(article);
        }).not.toThrow();
        
        expect(() => {
            const article = new Article({
                subject: '글 제목2',
                content: '내용',
                author: '작성자',
            });
            notAddedBoard.publish(article);
        }).toThrow();
    });
    //7번
    test('Board에 Article을 추가할 때 Article에 ID를 자동 생성해서 부여해야 한다.', () => {
        const noticeBoard = new Board('공지사항');
        mySite.addBoard(noticeBoard);

        const article = new Article({
            subject: '첫번째 공지사항입니다.',
            content: '테스트 코드는 수정하면 안됩니다.',
            author: '강승현',
        });
        noticeBoard.publish(article);
        // 규칙은 ${board.name}-${랜덤 값} 를 따른다.
        expect(article.id.startsWith('공지사항-')).toBe(true);
    });

    //8번
    test('Board에 Article을 추가할 때 Article에 작성 일자가 들어가야 한다.', () => {
        const noticeBoard = new Board('공지사항');
        mySite.addBoard(noticeBoard);

        const article = new Article({
            subject: '첫번째 공지사항입니다.',
            content: '테스트 코드는 수정하면 안됩니다.',
            author: '강승현',
        });
        noticeBoard.publish(article);
        // createdDate가 저장되는 형식은 ISO 8601을 따른다.
        expect(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(article.createdDate)).toBe(true);
    });

    //9번
    test('Article 은 n개 이상 추가 할 수 있다.', () => {
        const noticeBoard = new Board('공지사항');
        mySite.addBoard(noticeBoard);

        const article = new Article({
            subject: '첫번째 공지사항입니다.',
            content: '테스트 코드는 수정하면 안됩니다.',
            author: '강승현',
        });
        const article2 = new Article({
            subject: '두번째 공지사항입니다.',
            content: 'DB나 웹서버를 이용할 필요는 없습니다.',
            author: '강승현',
        });

        noticeBoard.publish(article);

        expect(() => {
            noticeBoard.publish(article2);
        }).not.toThrow();
    });


    //10번
    test('작성된 Article 목록을 조회 할 수 있어야 한다.', () => {
        const noticeBoard = new Board('공지사항');
        mySite.addBoard(noticeBoard);

        const article = new Article({
            subject: '첫번째 공지사항입니다.',
            content: '테스트 코드는 수정하면 안됩니다.',
            author: '강승현',
        });
        noticeBoard.publish(article);

        const article2 = new Article({
            subject: '두번째 공지사항입니다.',
            content: 'DB나 웹서버를 이용할 필요는 없습니다.',
            author: '강승현',
        });
        noticeBoard.publish(article2);

        expect(noticeBoard.getAllArticles()).toEqual([article, article2]);
    });
});



describe('Article 요구사항 테스트', () => {
    /**
     * @type {Site}
     */
    let mySite;

    beforeEach(() => {
        // NOTE: Reset `mySite`
        mySite = new Site();
        const noticeBoard = new Board('공지사항');
        mySite.addBoard(noticeBoard);
    });
    //11번
    test('Article은 subject, content, author 3개의 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다.', () => {
        const noticeBoard = mySite.findBoardByName('공지사항');
        
        expect(() => {
            const article = new Article({
                subject: '첫번째 공지사항입니다.',
                content: '테스트 코드는 수정하면 안됩니다.',
                author: '강승현',
            });
            noticeBoard.publish(article);
        }).not.toThrow();

        expect(() => {
            const article2 = new Article({
                subject: null,
                content: null,
                author: '',
            });
            noticeBoard.publish(article2);
        }).toThrow();
    });
    //12번
    test('Board에 추가된 Article만 사용 가능한 것으로 간주하며 사용 불가능한 Article에는 Comment를 추가할 수 없다.', () => {
        const noticeBoard = mySite.findBoardByName('공지사항');

        const publishedArticle = new Article({
            subject: '첫번째 공지사항입니다.',
            content: '테스트 코드는 수정하면 안됩니다.',
            author: '강승현',
        });
        noticeBoard.publish(publishedArticle);

        const draftArticle = new Article({
            subject: '아직 게시하지 않은 공지사항입니다.',
            content: '댓글을 달 수 없어야 합니다',
            author: '강승현',
        });
       
        expect(() => {
            const comment = new Comment({
                content: '넵!',
                author: '댕댕이',
            });
            publishedArticle.reply(comment);
        }).not.toThrow();

        expect(() => {
            const comment = new Comment({
                content: '넵!',
                author: '댕댕이',
            });
            draftArticle.reply(comment);
        }).toThrow();
    });
    //13번
    test('Article에 Comment를 추가할 때 Comment에 작성 일자가 들어가야 한다.', () => {
        const noticeBoard = mySite.findBoardByName('공지사항');

        const article = new Article({
            subject: '첫번째 공지사항입니다.',
            content: '테스트 코드는 수정하면 안됩니다.',
            author: '강승현',
        });
        noticeBoard.publish(article);

        const comment = new Comment({
            content: '넵!',
            author: '댕댕이',
        });
        article.reply(comment);

        // createdDate가 저장되는 형식은 ISO 8601을 따른다.
        expect(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(comment.createdDate)).toBe(true);
    });
    //14번
    test('Comment는 n개 이상 추가 할 수 있다.', () => {
        const noticeBoard = mySite.findBoardByName('공지사항');

        const article = new Article({
            subject: '첫번째 공지사항입니다.',
            content: '테스트 코드는 수정하면 안됩니다.',
            author: '강승현',
        });
        noticeBoard.publish(article);

        const comment = new Comment({
            content: '넵!',
            author: '댕댕이',
        });
        const comment2 = new Comment({
            content: '네넵!',
            author: '냥냥이',
        });

        expect(() => {
            article.reply(comment);
            article.reply(comment2);
        }).not.toThrow();
    });
    //15번
    test('작성된 Comment 목록을 조회 할 수 있어야 한다.', () => {
        const noticeBoard = mySite.findBoardByName('공지사항');

        const article = new Article({
            subject: '첫번째 공지사항입니다.',
            content: '테스트 코드는 수정하면 안됩니다.',
            author: '강승현',
        });
        noticeBoard.publish(article);

        const comment = new Comment({
            content: '넵!',
            author: '댕댕이',
        });
        const comment2 = new Comment({
            content: '네넵!',
            author: '냥냥이',
        });
        article.reply(comment);
        article.reply(comment2);

        expect(article.getAllComments()).toEqual([comment, comment2]);
    });
});

describe('Comment 요구사항 테스트', () => {
    /**
     * @type {Site}
     */
    let mySite;

    beforeEach(() => {
        // NOTE: Reset `mySite`
        mySite = new Site();
        const noticeBoard = new Board('공지사항');
        mySite.addBoard(noticeBoard);

        const article = new Article({
            subject: '첫번째 공지사항입니다.',
            content: '테스트 코드는 수정하면 안됩니다.',
            author: '강승현',
        });
        noticeBoard.publish(article);
    });
    //16번
    test('Comment는 content, author 2개의 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다.', () => {
        const noticeBoard = mySite.findBoardByName('공지사항');
        const [article] = noticeBoard.getAllArticles();

        expect(() => {
            const comment = new Comment({
                content: '댓글1111',
                author: '강승현',
            });
            article.reply(comment);
        }).not.toThrow();

        expect(() => {
            const comment = new Comment({
                content: null,
                author: '',
            });
            article.reply(comment);
        }).toThrow();
    });
});
