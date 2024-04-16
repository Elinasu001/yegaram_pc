/**
 * Created by SI2_JongRakMoon on 2018-03-07.
 */

var bankCalcUtils = {
    /**
     *  예금계산
     *  @param {number} period 예금 기간
     *  @param {number} money 예치금
     *  @param {number} rate 예금 이율
     *  @param {string} depositType 예금방법(1:단리,0:복리)
     *  @return {Object} 계산 결과 Obj
     */
		fnCal1: function (period, money, rate, depositType) {
	        var result = [];
	        
	        var model = {
	        	title : "",			//구분
	        	sum_mon : "",		//월납입액 합계
	        	b_interest : "",	//이자(세금 전)
	        	a_interest : "",	//이자(세금 후)
	        	total_money : "",	//만기지급액
	        };

	        var before = 0; 								// 세전이자
	        var after = 0; 									// 일반세후이자
	        var primetaxmoney = 0; 							// 우대세금

	        period = parseInt(period);
	        money = parseInt(money);

	        //단리 계산
	        if (depositType == "1") {
	            before = parseInt( money * (rate / 100) / 12 ); 														 // 세전이자
	            after = before - this.cutWon(this.cutWon(before * 0.14) + this.cutWon(before * 0.014)); // 세후이자
	            primetaxmoney = before - this.cutWon(this.cutWon(before * 0.09) + this.cutWon(before * 0.005)); // 세금우대
	            
	            //일반
	            var model1 = $.extend(true, {}, model);
	            model1.title = "일반";
	            model1.b_interest = Math.floor(before * period);
	            model1.a_interest = Math.floor(after * period);
	            model1.total_money = Math.floor(money + after * period);
	            model1.sum_mon = Math.floor(model1.total_money - model1.a_interest);
	            result.push(model1);
	            
	            //비과세
	            var model2 = $.extend(true, {}, model);
	            model2.title = "비과세";
	            model2.b_interest = Math.floor(before * period);
	            model2.a_interest = Math.floor(before * period);
	            model2.total_money = Math.floor(money + before * period);
	            model2.sum_mon = Math.floor(model2.total_money - model2.a_interest);   
	            result.push(model2);

	        } else {
	            before = parseInt(money * Math.pow(1 + (rate / 100) / 12, period)); 					// 세전이자
	            before = parseInt(before - money);
	            after = before - this.cutWon(this.cutWon(before * 0.14) + this.cutWon(before * 0.014)); 	// 세후이자
	            primetaxmoney = before - this.cutWon(this.cutWon(before * 0.09) + this.cutWon(before * 0.005));  // 세금우대

	            //일반
	            var model1 = $.extend(true, {}, model);
	            model1.title = "일반";
	            model1.b_interest = Math.floor(before);
	            model1.a_interest = Math.floor(after);
	            model1.total_money = Math.floor(money + after);
	            model1.sum_mon = Math.floor(model1.total_money - model1.a_interest);
	            result.push(model1);
	            
	            //비과세
	            var model2 = $.extend(true, {}, model);
	            model2.title = "비과세";
	            model2.b_interest = Math.floor(before);
	            model2.a_interest = Math.floor(before);
	            model2.total_money = Math.floor(money + before);
	            model2.sum_mon = Math.floor(model2.total_money - model2.a_interest);   
	            result.push(model2);
	        }

	        return result;
	    },

		
    /**
     *  적금계산 - 월
     *  @param {number} period 예금 기간
     *  @param {number} money 예치금
     *  @param {number} rate 예금 이율
     *  @return {Object}
     */
    fnCal2: function (period, money, rate) {
    	
        var result = [];
        
        var model = {
        	title : "",			//구분
        	sum_mon : "",		//월납입액 합계
        	b_interest : "",	//이자(세금 전)
        	a_interest : "",	//이자(세금 후)
        	total_money : "",	//만기지급액
        };

        var before = 0; 								// 세전이자
        var after = 0; 									// 일반세후이자
        var primetaxmoney = 0; 							// 우대세금

        var tmp = 0;
        var tax = 9.5;

        period = parseInt(period);
        money = parseInt(money);

        for (var i = 1; i <= period; i++) {
            tmp = money * (period - i + 1) * (rate / 100 / 12);
            before += tmp;
        }
        before = parseInt(before);
        after = before - this.cutWon((before * 0.154)); // 세후이자
        primetaxmoney = before - this.cutWon((before * 0.095)); // 세금우대

        //일반
        var model1 = $.extend(true, {}, model);
        model1.title = "일반";
        model1.b_interest = Math.floor(before);
        model1.a_interest = Math.floor(after);
        model1.total_money = Math.floor(money * period + after);
        model1.sum_mon = Math.floor(model1.total_money - model1.a_interest);
        result.push(model1);
        
        //비과세
        var model2 = $.extend(true, {}, model);
        model2.title = "비과세";
        model2.b_interest = Math.floor(before);
        model2.a_interest = Math.floor(before);
        model2.total_money = Math.floor(money * period + before);
        model2.sum_mon = Math.floor(model2.total_money - model2.a_interest);   
        result.push(model2);

        return result;
    },

    /**
     *  적금계산 - 만기
     *  @param {number} period 예금 기간
     *  @param {number} money 예치금
     *  @param {number} rate 예금 이율
     *  @return {Object}
     */
    fnCal3: function (period, money, rate) {
    	
        var result = [];
        
        var model = {
        	title : "",			//구분
        	sum_mon : "",		//월납입액 합계
        	b_interest : "",	//이자(세금 전)
        	a_interest : "",	//이자(세금 후)
        	total_money : "",	//만기지급액
        };

        var before = 0; 								// 세전이자
        var after = 0; 									// 일반세후이자
        var primetaxmoney = 0; 							// 우대세금

        var tmp = 0;
        var tmp1 = 0;

        period = parseInt(period);
        money = parseInt(money);
        rate = new Number(rate);
        rate = rate/100;

        for (var i = 1; i <= period; i++) {
            tmp = (period - i + 1) * (rate / 100 / 12);
            before += tmp;
        }

        tmp = money / (period + before);
        tmp1 = tmp * before;
        
        before = Math.round( money*(1+rate/12)*(1-(Math.pow((1+rate/12), period)))/(1-(1+rate/12))-(money*period) );

        //비과세
        var model2 = $.extend(true, {}, model);
        model2.title = "비과세";
        model2.b_interest = before;
        model2.a_interest = before;
        model2.total_money = Math.floor(money * period + before);
        model2.sum_mon = Math.floor(model2.total_money - model2.a_interest);  

        //일반
        var model1 = $.extend(true, {}, model);
        model1.title = "일반";
        model1.b_interest = before;
        model1.a_interest = Math.round(before*(1-0.154));
        model1.total_money = Math.floor(money * period + model1.a_interest);
        model1.sum_mon = Math.floor(model1.total_money - model1.a_interest);
        
        result.push(model1);
        result.push(model2);

        return result;
    },

    /**
     * bankCalcUtils
     *  대출계산기
     *  @param {number} loanType 대출 방법(0:원금만기일시상환,1:원금균등상환,2:원리금균등상환)
     *  @param {number} originMoney 대출원금
     *  @param {number} loanPeriod 대출기간
     *  @param {number} holdingPeriod 거치기간
     *  @param {number} loanRate 대출이율
     *  @return {Object}
     */
    fnCal4: function (loanType, originMoney, loanPeriod, holdingPeriod, loanRate) {
    	
    	loanRate = loanRate/100;
    	originMoney = originMoney*1;
    	loanPeriod = loanPeriod*1;
    	holdingPeriod = holdingPeriod*1;
    	loanRate = loanRate*1;
    	
    	
    	
        var result = {
            //원금
            originMoney: originMoney,
            //빌린기간
            loanPeriod: loanPeriod,
            //거치기간
            holdingPeriod: holdingPeriod,
            //이자율
            loanRate: loanRate,
            //원금만기일시산환일 경우:월평균이자,원금균등상환일경우:월납입원금,원리금균등산환일경우:월상환금액
            repaymentMoney: 0,
            //총 이자액
            interestMoney: 0,
            //원금 및 총이자액 합계
            totalMoney: 0,
            /*
            index: 회차 - 1
            row.repaymentTotalMoney:상환금
            row.repaymentOriginMoney:납입원금
            row.repaymentInterestMoney:이자
            row.repaymentOriginMoneySum:납입원금누계
            row.remainMoney:잔금
            */
            table: []
        };

        //계산결과
        var monthlyLoan = 0;	//월상환금
        var totalInterest = 0;		//총이자
        var loanAndInterest = 0;		//원금및이자

        var interest = 0;	//이자
        var repaymentOriginMoney = 0;	//납입원금
        var repayment = 0;	//상환금

        var originRepaymentTotal = 0;	//납입원금 누계
        var remainMoney = originMoney;	//잔금

        for (var i = 0; i < loanPeriod; i++) {
            interest = this.calcInterest(loanType, i, originMoney, loanRate, remainMoney);
            totalInterest = totalInterest + interest;

            if (loanType == "2") {
                repayment = this.calcRepayment(loanType, repaymentOriginMoney, interest, loanRate, loanPeriod, holdingPeriod, originMoney, i);
                if (i >= holdingPeriod) {	//거치기간 후부터 계산
                    repaymentOriginMoney = this.calcOriginLoanMoney(loanType, i, loanPeriod, originMoney, holdingPeriod, repayment, interest);
                }
            } else {
                if (i >= holdingPeriod) {	//거치기간 후부터 계산
                    repaymentOriginMoney = this.calcOriginLoanMoney(loanType, i, loanPeriod, originMoney, holdingPeriod, repayment, interest);
                }
                repayment = this.calcRepayment(loanType, repaymentOriginMoney, interest, loanRate, loanPeriod, holdingPeriod, originMoney, i);
            }
            originRepaymentTotal = originRepaymentTotal + repaymentOriginMoney;
            remainMoney = originMoney - originRepaymentTotal;

            var row = {};
            row.repaymentTotalMoney = Math.round(repayment);
            row.repaymentOriginMoney = Math.round(repaymentOriginMoney);
            row.repaymentInterestMoney = Math.round(interest);
            row.repaymentOriginMoneySum = Math.round(originRepaymentTotal);
            row.remainMoney = Math.round(remainMoney);

            result.table.push(row);
        }

        if (loanType == "0") {
            monthlyLoan = totalInterest / loanPeriod;
        } else if (loanType == "1") {
            monthlyLoan = repaymentOriginMoney / (loanPeriod - holdingPeriod);
        } else if (loanType == "2") {
            monthlyLoan = repaymentOriginMoney * loanRate / 12;
            monthlyLoan = monthlyLoan * (Math.pow((1 + loanRate / 12), (loanPeriod - holdingPeriod)));
            monthlyLoan = monthlyLoan / (Math.pow((1 + loanRate / 12), (loanPeriod - holdingPeriod)) - 1);
        }
        loanAndInterest = repaymentOriginMoney + totalInterest;

        result.repaymentMoney = Math.round(monthlyLoan);
        result.interestMoney = Math.round(totalInterest);
        result.totalMoney = Math.round(loanAndInterest);

        return result;
    },

    /**
     * 이자계산 로직
     * @param {string} loanType 대출 방법(0:원금만기일시상환,1:원금균등상환,2:원리금균등상환)
     * @param {string} i 대출 개월수
     * @param {string} originMoney 원금
     * @param {string} loanRate 대출 이율
     * @param {string} remainLoan 남은 대출금액
     * @return {number} 이달에 발생한 이자
     */
    calcInterest: function (loanType, i, originMoney, loanRate, remainLoan) {	//이자
        var result = 0;
        if (loanType == "0") {					//원금만기일시상환
            //$I$8*$J$26/12
            result = originMoney * loanRate / 12;
        } else if (loanType == "1") {				//원금균등상환
            if (i == 0) {
                //$I$8*$J$26/12
                result = originMoney * loanRate / 12;
            } else {
                //N28*$J$26/12
                result = remainLoan * loanRate / 12;
            }
        } else if (loanType == "2") {				//원리금균등상환
            if (i == 0) {
                //$I$8*$J$26/12
                result = originMoney * loanRate / 12;
            } else {
                //N28*$J$26/12
                result = remainLoan * loanRate / 12;
            }
        }
        return result;
    },

    /**
     *    납입원금 계산
     * @param {string} loanType 대출 방법(0:원금만기일시상환,1:원금균등상환,2:원리금균등상환)
     * @param {string} i 대출 개월수
     * @param {string} loanPeriod 대출기간
     * @param {string} originMoney 원금
     * @param {string} holdingPeriod 거치기간
     * @param {string} repaymentMoney 상환금액
     * @param {string} interest 이자
     * @return {number} 납입한 원금
     */
    calcOriginLoanMoney: function (loanType, i, loanPeriod, originMoney, holdingPeriod, repaymentMoney, interest) {
        var result = 0;
        if (loanType == "0") {					//원금만기일시상환
            if (i == (loanPeriod - 1)) {	//마지막라인인경우
                result = originMoney;
            }
        } else if (loanType == "1") {				//원금균등상환
            //$I$8/($I$11-$I$14)
            result = originMoney / (loanPeriod - holdingPeriod);
        } else if (loanType == "2") {				//원리금균등상환
            result = repaymentMoney - interest;
        }
        return result;
    },

    /**
     *    상환금 계산
     * @param {string} loanType 대출 방법(0:원금만기일시상환,1:원금균등상환,2:원리금균등상환)
     * @param {string} repaymentOriginMoney 상환 원금
     * @param {string} interest 대출 이자
     * @param {string} loanRate 대출 이율
     * @param {string} loanPeriod 대출기간
     * @param {string} holdingPeriod 거치기간
     * @param {string} originMoney 원금
     * @param {string} i 대출 개월수
     * @return {number} 상환할 금액
     */
    calcRepayment: function (loanType, repaymentOriginMoney, interest, loanRate, loanPeriod, holdingPeriod, originMoney, i) {
        var result = 0;
        
        repaymentOriginMoney = repaymentOriginMoney*1;
        interest = interest*1;
        loanRate = loanRate*1;
        loanPeriod = loanPeriod*1;
        holdingPeriod = holdingPeriod*1;
        originMoney = originMoney*1;
        
        
        if (loanType == "0") {					//원금만기일시상환
            result = repaymentOriginMoney + interest;
        } else if (loanType == "1") {				//원금균등상환
            result = repaymentOriginMoney + interest;
        } else if (loanType == "2") {				//원리금균등상환
            if (i >= holdingPeriod) {	//거치기간 후부터 계산
                //($I$8*$J$26/12*(1+$J$26/12)^($I$11-$I$14))/((1+$J$26/12)^($I$11-$I$14)-1)
                result = (originMoney * loanRate / 12) * (Math.pow((1 + loanRate / 12), (loanPeriod - holdingPeriod)));
                result = result / (Math.pow((1 + loanRate / 12), (loanPeriod - holdingPeriod)) - 1);
            } else {
                result = repaymentOriginMoney + interest;
            }
        }
        return result;
    },

    /**
     * @param {number} money
     * @return {string} 소수점 아래 4번째 절삭
     */
    cutWon: function (money) {
        var chgstr;
        var retstr;

        money = Number(money + 0.001);

        chgstr = String(money);
        //alert("??:"+chgstr);
        retstr = chgstr.substring(0, chgstr.length - 1) + "0";

        return Number(retstr);
    },

    /**
     * @param {number} money
     * @return {string} 30000 -> 30,000
     */
    addComma: function (money) {
        money = removeComma(money);
        money = Math.round(money);
        if (money == 0 || isNaN(money)) {
            return '0';
        }

        var chgstr = String(money);
        var li = chgstr.length - 3;
        var retstr = "";
        var i;

        for (i = li; i >= 1; i = i - 3) {
            retstr = "," + chgstr.substring(i, i + 3) + retstr;
        }

        retstr = chgstr.substring(0, i + 3) + retstr;
        return retstr;
    },
    /**
     * @param {number} money
     * @return {string} 30,000 -> 30000
     */
    removeComma: function (money) {
        return money.replace(/,/g, '');
    }
};