package hello;

/**
 * Created by e125761 on 2017/09/21.
 */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

import static hello.MemberService.members;

@Controller
@RequestMapping(path="/member")
public class MemberController {

    @RequestMapping(path="/hello")
    @ResponseBody
    public String hello() {
        return "Hello, World from MemberController!";
    }

    @RequestMapping(path="/all")
    @ResponseBody
    public ArrayList<HashMap> memberAll() {
        return members;
    }

    @RequestMapping(path="/add", method=RequestMethod.POST)
    @ResponseBody
    public HashMap<String, String> memberAdd(@RequestParam(value="name", required=false) String name,
                                        @RequestParam(value="email", required=false) String email) {
        HashMap<String, String> member = new HashMap<>();
        member.put("name", name);
        member.put("email", email);
        members.add(member);
        return members.get(members.size() - 1);
    }

    @RequestMapping(path="/delete", method=RequestMethod.POST)
    @ResponseBody
    public ArrayList<HashMap> memberDestroy(@RequestParam(value="id") int id) {
        if (!members.isEmpty()) {
            members.remove(id);
        }
        return members;
    }

    @RequestMapping(path="/update")
    @ResponseBody
    public ArrayList<HashMap> memberUpdate(@RequestParam(value="id") int id,
                                           @RequestParam(value="name") String name,
                                           @RequestParam(value="email") String email
                                           ) {
        HashMap<String, String> member = new HashMap<>();
        member.put("name", name);
        member.put("email", email);
        members.set(id, member);
        return members;
    }
}
