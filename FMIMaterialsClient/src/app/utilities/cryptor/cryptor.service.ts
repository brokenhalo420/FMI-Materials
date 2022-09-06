import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptorService {


  private encryptTable: any= {
    'a':'d',
    'b':'e',
    'c':'f',
    'd':'g',
    'e':'h',
    'f':'i',
    'g':'j',
    'h':'k',
    'i':'l',
    'j':'m',
    'k':'n',
    'l':'o',
    'm':'p',
    'n':'q',
    'o':'r',
    'p':'s',
    'q':'t',
    'r':'u',
    's':'v',
    't':'w',
    'u':'x',
    'v':'y',
    'w':'z',
    'x':'@',
    'y':'$',
    'z':'!',
    '@':'%',
    '$':'*',
    '!':'#',
    '%':'?',
    '*':'&',
    '#':'A',
    '?':'B',
    '&':'C',
    'A':'D',
    'B':'E',
    'C':'F',
    'D':'G',
    'E':'H',
    'F':'I',
    'G':'J',
    'H':'K',
    'I':'L',
    'J':'M',
    'K':'N',
    'L':'O',
    'M':'P',
    'N':'Q',
    'O':'R',
    'P':'S',
    'Q':'T',
    'R':'U',
    'S':'V',
    'T':'W',
    'U':'X',
    'V':'Y',
    'W':'Z',
    'X':'0',
    'Y':'1',
    'Z':'2',
    '0':'3',
    '1':'4',
    '2':'5',
    '3':'6',
    '4':'7',
    '5':'8',
    '6':'9',
    '7':'a',
    '8':'b',
    '9':'c',
  }

  constructor() { }

  encrypt(content: string){
    let encrypted = "";
    for( let i = 0; i < content.length; i++){
        encrypted+= this.encryptTable[content.charAt(i)];
    }

    return encrypted;
  }
}
