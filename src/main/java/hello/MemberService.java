package hello;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by e125761 on 2017/10/11.
 */
public class MemberService {
    static ArrayList<HashMap> members;

    public static ArrayList<HashMap> initMembers() {
        ArrayList<HashMap> members = new ArrayList<>();
        HashMap<String, String> member1 = new HashMap<>();
        member1.put("name", "Terufumi Shimoji");
        member1.put("email", "terufumi.shimoji@okinawa.co.jp");
        members.add(member1);
        HashMap<String, String> member2 = new HashMap<>();
        member2.put("name", "Akihisa Shimoji");
        member2.put("email", "akihisa.shimoji@okinawa.co.jp");
        members.add(member2);
        return members;
    }
}
