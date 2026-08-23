from flask import Flask,jsonify,request,render_template
app=Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/")
#  odd/even
#  prime number

def num_analyzer(num):
    if num%2==0:
        even_odd="Even"
    else:
        even_odd="Odd"
    if num<2:
        prime=False
    else:
        prime=True
        for i in range(2,int(num**0.5)+1):
        # for i in range(2,num):
            if num %i==0:
                prime=False
                break

    reverse=int(str(num)[::-1])
    palindrome=(num == reverse)
    digit_sum=sum(int(digit)for digit in str(num))

    digits=[int(digit)for digit in str(num)]
    largest_digit=max(digits)
    smallest_digit=min(digits)

    digit_count=len(digits)

    amst_sum=sum(int(digit)**digit_count for digit in str(num))
    amst_sum=(num==amst_sum)

    factors=[]
    for i in range(1,num+1):
        if num%i==0:
            factors.append(i)

 

    return {"Number": num,
            "Even or Odd": even_odd,
            "Prime": prime,
            "Reverse": reverse,
            "Palindrome": palindrome,
            "Sum Of The Digit": digit_sum,
            "Largest Number": largest_digit,
            "Smallest Number":smallest_digit,
            "No Of Digits": digit_count,
            "Armstrong Number": amst_sum,
            "Factors": factors}


@app.route("/analyze/<num>")
def analyze(num):
    try:
        num=int(num)
    except ValueError:
        return ({"Error": "Please Enter a Valid Number"}),400
    if num<=0:
        return jsonify({"Error": "Please Enter a Positive Number"}),400


    result=num_analyzer(num)
    return jsonify({
        "Success": True,
        "data": result})

@app.route("/analyze",methods=["POST"])
def analyze_post():
    data=request.get_json()
    number=data.get("number")
    # error handling
    if number is None:
        return ({"Error": "Please Provide a Number"}),400
    if not isinstance(number,int):
        return ({"Error": "Please Enter a Valid Number"}),400
    if number<=0:
        return ({"Error": "Please Enter a Positive Number"}),400

    result=num_analyzer(number)
    return jsonify({
        "Success": True,
        "data": result})



if __name__=="__main__":
    app.run(debug=True)