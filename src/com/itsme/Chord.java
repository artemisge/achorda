package com.itsme;

import java.util.TreeMap;

import com.itsme.Scale.Note;

public class Chord {
    public int chordNumber; //i bathmida px I, IV, xoris na mas noiazei minor/major
    public chordType attribute; //to chord type px major, minor


    public enum chordType {
        MAJOR,
        MINOR,
        MAJORSEVEN,
        MINORSEVEN,
        NINE,
        DIMINISHED,
        AUGMENTED;
    }

    private final static TreeMap<Integer, String> map = new TreeMap<Integer, String>();

    static {
        map.put(7, "VII");
        map.put(6, "VI");
        map.put(5, "V");
        map.put(4, "IV");
        map.put(3, "III");
        map.put(2, "II");
        map.put(1, "I");
    }

    public Chord(int chordNumber, chordType attribute) {
        this.chordNumber = chordNumber;
        this.attribute = attribute;
    }

    public void print() {
        System.out.println(chordNumber + " "+ attribute.toString() +"\n");
    }

    public void printRoman() {
        String chord = map.get(chordNumber); // equivalent roman number
        if (attribute == chordType.MAJOR) {
            chord = new String(chord.toUpperCase());
        } else if (attribute == chordType.MINOR) {
            chord = new String(chord.toLowerCase());
        } else if (attribute == chordType.DIMINISHED) {
            chord = new String(chord.toLowerCase() +"dim");
        } else if (attribute == chordType.MAJORSEVEN) {
            chord = new String(chord.toLowerCase() +"dim");
        }
        System.out.println(chordNumber + " "+ attribute.toString() +"\n");
    }
}
