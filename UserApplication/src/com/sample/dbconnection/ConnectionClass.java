package com.sample.dbconnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class ConnectionClass {
	
	public  boolean insertName(String name){
		
	try{  
		Class.forName("com.mysql.jdbc.Driver");  
		Connection con=DriverManager.getConnection(  
		"jdbc:mysql://localhost:3306/sample","root","");  
		
		String query = " insert into user (name)"
		        + " values (?)";
		 PreparedStatement preparedStmt = con.prepareStatement(query);
	      preparedStmt.setString (1, name);
	      preparedStmt.execute();
	      con.close(); 
	      return true;
		 
		}catch(Exception e){ System.out.println(e);
		return false;
		}  
		} 
/*public static  void main(String args[]){
	boolean flag=insertName("navya");
	System.out.println("flag   "+flag);
}*/

}
